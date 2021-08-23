const { prisma } = require("../lib/prisma.js");
const slugify = require("slugify");
const { checkValidatorError, notFoundError } = require("../utils/errors");

// shortcuts TODO
// ctrl + shift + \
// ctrl + enter
const includeCategoryAndUsers = {
    category: {
        select: {
            name: true,
        },
    },
    user: {
        select: {
            userName: true,
        },
    },
};

function removeUselessProperties(blog) {
    delete blog.category_id;
    delete blog.user_id;
    delete blog.ips;
    blog.category = blog.category.name;
    blog.user = blog.user.userName;
    blog.comments = blog.comments.length;
}

//#region GET

//#region GET ALL
const getAllBlogs = async (req, res) => {
    const blogs = await prisma.blog.findMany({
        include: includeCategoryAndUsers,
    });
    blogs.map((blog) => {
        removeUselessProperties(blog);
    });

    res.json(blogs);
};
//#endregion GET ALL

//#region  GET BLOG BY TTILE
const getBlogByTitle = async (req, res) => {
    const title = req.params.title;

    console.log(title, "(getBogByTitle)");
    let blog = await prisma.blog.findFirst({
        where: { slug: title },
        include: includeCategoryAndUsers,
    });

    if (!blog) {
        return notFoundError(res, "blog with this title was not found");
    }

    removeUselessProperties(blog);

    res.json(blog);
};
//#endregion GET BLOG BY TITLE

//#region GET BLOGS BY CATEGORY
const getBlogByCategory = async (req, res) => {
    const name = req.params.name;

    let category = await prisma.category.findFirst({
        where: { name },
    });

    const blogs = await prisma.blog.findMany({
        where: {
            category: { name },
        },
        include: includeCategoryAndUsers,
    });

    //just in case
    if (blogs.length === 0) {
        return notFoundError(res, "blogs with this category were not found");
    }

    blogs.map((blog) => {
        removeUselessProperties(blog);
        delete blog.content;
    });

    res.json(blogs);
};

//#endregion GET BLOGS BY CATEGORY

//TOOD add By tags route

//#region GET BLOGS BY AUTHOR
const getBlogByAuthor = async (req, res) => {
    const name = req.params.name;

    const blogs = await prisma.blog.findMany({
        where: {
            user: {
                userName: name,
            },
        },
        include: includeCategoryAndUsers,
    });

    if (blogs.length === 0) {
        return notFoundError(res, "blogs with this author were not found");
    }

    blogs.map((blog) => {
        removeUselessProperties(blog);
    });

    res.json(blogs);
};
//#endregion GET BLOGS BY AUTHOR

//#region  GET BLOGS BY SEARCH
const getBlogBySearch = async (req, res) => {
    const name = req.params.name;

    const blogs = await prisma.blog.findMany({
        where: {
            title: {
                contains: name,
                mode: "insensitive",
            },
        },
        include: includeCategoryAndUsers,
    });

    if (blogs.length === 0) {
        return notFoundError(res, "blogs with these search params were not found");
    }

    blogs.map((blog) => {
        removeUselessProperties(blog);
        delete blog.content;
    });

    res.json(blogs);
};
//#endregion  GET BLOGS BY SEARCH

//region GET POPULAR BLOGS
const getPopularBlogs = async (req, res) => {
    const blogs = await prisma.blog.findMany({
        orderBy: {
            views: "desc",
        },
        take: 5,
        include: includeCategoryAndUsers,
    });

    blogs.map((blog) => {
        removeUselessProperties(blog);
        delete blog.content;
    });

    res.json(blogs);
};

//#endregion

//region GET POPULAR BLOGS
const getRelatedBlogs = async (req, res) => {
    const { category, title } = req.params;

    // for the time being, in the future, make it incldue  tags as well maybe?
    const blogs = await prisma.blog.findMany({
        where: {
            category: {
                name: category,
            },

            NOT: {
                title,
            },
        },
        orderBy: {
            views: "desc",
        },
        take: 3,
        include: includeCategoryAndUsers,
    });

    for (let blog of blogs) {
        removeUselessProperties(blog);
        delete blog.content;
    }

    res.json(blogs);
};

//#endregion

//#endregion GET

//#region PUT
const count_views = async (req, res) => {
    const { title } = req.body;

    const errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(500).json({ errors });
    }

    let blog = await prisma.blog.findFirst({
        where: { title },
    });

    if (!blog) {
        return notFoundError(res, "blog with this title was not found");
    }

    let ipFound = false;

    for (let ip of blog["ips"]) {
        if (ip === "7") {
            // TODO change mock ip number with real one in production
            ipFound = true;
        }
    }

    console.log(ipFound, "ipfound");
    if (!ipFound) {
        await prisma.blog.update({
            where: { title },
            data: {
                views: blog.views + 1,
                ips: [...blog.ips, "7"],
            },
        });
    }

    res.sendStatus(200);
};

const edit_blog = async (req, res) => {
    const { title } = req.params;
    const { title: updatedTitle, image, content, short_preview, preview, category } = req.body;

    const errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(500).json({ errors });
    }

    let blog = await prisma.blog.findFirst({
        where: { title },
    });

    if (!blog) {
        return notFoundError(res, "blog with this title was not found");
    }

    await prisma.blog.update({
        where: { title },
        data: {
            title: updatedTitle,
            image,
            content,
            short_preview,
            preview,
            edited: true,
            category: {
                connectOrCreate: {
                    create: {
                        name: category,
                    },
                    where: {
                        name: category,
                    },
                },
            },
        },
    });

    res.sendStatus(200);
};
//#endregion put

//#region POST
const create_blog = async (req, res) => {
    let { category, user_id, image } = req.body;
    category = category.toLowerCase();

    const errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(500).json({ errors });
    }

    delete req.body.category;
    delete req.body.user_id;
    delete req.body.image;

    image = image || "https://slaterandbrandley.co.uk/wp-content/uploads/2019/04/question-mark.png"; //insert default image here

    try {
        const blog = await prisma.blog.create({
            data: {
                ...req.body,
                slug: slugify(req.body.title.toLowerCase()),
                image,
                user: { connect: { id: user_id } },
                category: {
                    connectOrCreate: {
                        create: {
                            name: category,
                        },
                        where: {
                            name: category,
                        },
                    },
                },
            },
            include: includeCategoryAndUsers,
        });

        removeUselessProperties(blog);

        res.locals = { ...blog, ...res.locals };

        res.send({ blog: res.locals });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};
//#endregion POST

module.exports = {
    //get
    getAllBlogs,
    getBlogByTitle,
    getBlogByCategory,
    getBlogByAuthor,
    getBlogBySearch,
    getPopularBlogs,
    getRelatedBlogs,

    //post
    create_blog,

    //put
    count_views,
    edit_blog,
};
