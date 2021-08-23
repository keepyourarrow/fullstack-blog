const { prisma } = require("../lib/prisma.js");

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

function removeUselessUserProperties(user) {
    delete user.password;
    delete user.refresh_token;
    delete user.password_reset_count;
    delete user.disabled;
}

function removeUselessBlogProperties(blog) {
    delete blog.category_id;
    delete blog.user_id;
    delete blog.ips;
    blog.category = blog.category.name;
    blog.user = blog.user.userName;
    blog.comments = blog.comments.length;
}

// get ALL
const dashboard = async (req, res) => {
    const users = await prisma.user.findMany({
        orderBy: {
            created_at: "desc",
        },
    });
    const blogs = await prisma.blog.findMany({
        orderBy: {
            updated_at: "desc",
        },
        include: includeCategoryAndUsers,
    });

    const categories = await prisma.category.findMany({});

    for (let blog of blogs) {
        removeUselessBlogProperties(blog);
    }

    for (let user of users) {
        removeUselessUserProperties(user);
    }

    res.json({
        users: users.length,
        lastUsers: users.slice(0, 3),
        blogs: blogs.length,
        lastBlogs: blogs.slice(0, 3),
        categories: categories.length,
    });
};

module.exports = {
    //get
    dashboard,
};
