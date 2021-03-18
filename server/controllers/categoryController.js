const { prisma } = require("../lib/prisma.js");
const { checkValidatorError, notFoundError } = require("../utils/errors");

function removeUselessProperties(cat) {
    delete cat.ips;
    cat.blogs = cat.blogs.length;
}

const getAllCategories = async (req, res) => {
    const categories = await prisma.category.findMany({
        include: {
            blogs: {
                select: {
                    title: true,
                },
            },
        },
    });

    for (let category of categories) {
        removeUselessProperties(category);
    }

    res.json(categories);
};
const getCategoryByName = async (req, res) => {
    const id = parseInt(req.params.id);

    let user = await prisma.user.findFirst({
        where: { id },
    });

    if (!user) {
        return notFoundError(res, "user not found");
    }

    removeUselessProperties(user);

    console.log("request has been made(categoryController)");
    res.json(user);
};

//#region PUT
const count_views = async (req, res) => {
    const { name } = req.body;

    const errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(500).json({ errors });
    }

    let category = await prisma.category.findFirst({
        where: { name },
    });

    if (!category) {
        return notFoundError(res, "category with this name was not found");
    }

    let ipFound = false;
    for (let ip of category["ips"]) {
        if (ip === "5") {
            // TODO change mock ip number with real one in production
            ipFound = true;
        }
    }

    console.log(ipFound, "ipfound");
    if (!ipFound) {
        await prisma.category.update({
            where: { name },
            data: {
                views: category.views + 1,
                ips: [...category.ips, "5"],
            },
        });
    }

    res.sendStatus(200);
};

module.exports = {
    //get
    getAllCategories,
    getCategoryByName,

    //put
    count_views,
};
