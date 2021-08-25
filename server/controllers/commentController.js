const { prisma } = require("../lib/prisma.js");
const { checkValidatorError, notFoundError } = require("../utils/errors");

function removeUselessProperties(cat) {
    delete cat.ips;
    cat.blogs = cat.blogs.length;
}

//#region POST
const post_comment = async (req, res) => {
    console.log("request has been made(post_comment)");

    console.log("!!! commentController post_comment", req.body);
    // let { category, user_id, image } = req.body;
    // category = category.toLowerCase();

    const errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(500).json({ errors });
    }
    res.sendStatus(200);
    return;

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
    //create
    post_comment,
};
