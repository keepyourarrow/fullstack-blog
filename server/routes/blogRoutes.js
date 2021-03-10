const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogsController");
const { requireAuth, adminOnly } = require("../middleware/authMiddleware");
const { putCountViews, postBlogValidator } = require("../validators/blogsValidators");

const tempBlogs = [
    {
        title: "What Are Your Screen Time Rules?",
        slug: "What-Are-Your-Screen-Time-Rules",
        image: "https://cupofjo.com/wp-content/uploads/2020/10/anton-jo-scaled.jpg",
        content:
            "One of the best guiding companies on Everest has found itself at the center of a lawsuit that could have lasting consequences for the mountaineering world. Last week it was revealed that Madison Mountaineering is being sued by a former client for failing to provide a refund following a failed expedition to the world’s highest peak, If successful, the lawsuit could fundamentally change the client/guide relationship and set a dangerous precedent for future expeditions. A Cancelled ClimbLast fall, Garrett Madison—the founder of Madison Mountaineering—was leading a team of climbers to Mt. Everest. The plan was to make an attempt on the peak from the Nepali side of the mountain, a route that Madison knows well having climbed to the summit on multiple occasions over the past decade. Along the way, he has taken over 60 paying clients with him.Madison has been so successful in fact that he has only failed to put clients on the summit on three occasions out of ten attempts. In 2014, the spring climbing season was cancelled when a serac collapsed, killing 16 porters in the process. A year later, a massive earthquake claimed the lives of another 22 people on the mountain, shutting down that season as well.Autumn of 2019 would be the third time a Madison-led team would be forced to cancel its expedition. When the group of climbers arrived in Base Camp last fall, they found a large chunk of ice—estimated to weigh more than 27,000 pounds— was hanging precariously above the route they would take up the mountain. If it came down at the wrong time, it could spell certain death. Knowing that discretion is the better part of valor, Garrett elected to pull the plug and go home.",
        preview: "",
        shortdesc:
            "An actual roundabout expression pog a bit more description to check length real quick",
        createdAt: "October 22, 2020",
        author: "Kraig Becker",
        category: "Style",
        tags: ["Everest", "Himalaya", "Mountaing", "Nepal"],
        comments: 5,
        disabled: false,
        edited: false,
    },
    {
        title: "Have a Lovely Weekend.",
        slug: "Have-a-Lovely-Weekend.",
        image:
            "https://cupofjo.com/wp-content/uploads/2020/10/Screen-Shot-2020-10-21-at-3.38.32-PM.png",
        content:
            "One of the best guiding companies on Everest has found itself at the center of a lawsuit that could have lasting consequences for the mountaineering world. Last week it was revealed that Madison Mountaineering is being sued by a former client for failing to provide a refund following a failed expedition to the world’s highest peak, If successful, the lawsuit could fundamentally change the client/guide relationship and set a dangerous precedent for future expeditions. A Cancelled ClimbLast fall, Garrett Madison—the founder of Madison Mountaineering—was leading a team of climbers to Mt. Everest. The plan was to make an attempt on the peak from the Nepali side of the mountain, a route that Madison knows well having climbed to the summit on multiple occasions over the past decade. Along the way, he has taken over 60 paying clients with him.Madison has been so successful in fact that he has only failed to put clients on the summit on three occasions out of ten attempts. In 2014, the spring climbing season was cancelled when a serac collapsed, killing 16 porters in the process. A year later, a massive earthquake claimed the lives of another 22 people on the mountain, shutting down that season as well.Autumn of 2019 would be the third time a Madison-led team would be forced to cancel its expedition. When the group of climbers arrived in Base Camp last fall, they found a large chunk of ice—estimated to weigh more than 27,000 pounds— was hanging precariously above the route they would take up the mountain. If it came down at the wrong time, it could spell certain death. Knowing that discretion is the better part of valor, Garrett elected to pull the plug and go home.",
        preview: "",
        shortdesc: "An actual roundabout expression pog",
        createdAt: "October 14, 2020",
        author: "Kraig Becker",
        category: "Design",
        tags: ["Adventure Travel", "Macchu Picchu", "Peru"],
        comments: 0,
        disabled: false,
        edited: false,
    },
    {
        title: "What I’ve Learned As the Tooth Fairy",
        slug: "What-I’ve-Learned-As-the-Tooth-Fairy",
        image: "https://cupofjo.com/wp-content/uploads/2020/10/tooth-fairy-grace-farris.jpg",
        content:
            "One of the best guiding companies on Everest has found itself at the center of a lawsuit that could have lasting consequences for the mountaineering world. Last week it was revealed that Madison Mountaineering is being sued by a former client for failing to provide a refund following a failed expedition to the world’s highest peak, If successful, the lawsuit could fundamentally change the client/guide relationship and set a dangerous precedent for future expeditions. A Cancelled ClimbLast fall, Garrett Madison—the founder of Madison Mountaineering—was leading a team of climbers to Mt. Everest. The plan was to make an attempt on the peak from the Nepali side of the mountain, a route that Madison knows well having climbed to the summit on multiple occasions over the past decade. Along the way, he has taken over 60 paying clients with him.Madison has been so successful in fact that he has only failed to put clients on the summit on three occasions out of ten attempts. In 2014, the spring climbing season was cancelled when a serac collapsed, killing 16 porters in the process. A year later, a massive earthquake claimed the lives of another 22 people on the mountain, shutting down that season as well.Autumn of 2019 would be the third time a Madison-led team would be forced to cancel its expedition. When the group of climbers arrived in Base Camp last fall, they found a large chunk of ice—estimated to weigh more than 27,000 pounds— was hanging precariously above the route they would take up the mountain. If it came down at the wrong time, it could spell certain death. Knowing that discretion is the better part of valor, Garrett elected to pull the plug and go home.",

        preview: "Something amazing happened today...",
        shortdesc: "An actual roundabout expression pog",
        createdAt: "October 9, 2020",
        author: "Kraig Becker",
        category: "Design",
        tags: ["Adventure Travel", "Himalaya", "Nepal"],
        comments: 50,
        disabled: false,
        edited: false,
    },
    {
        title: "Harling Ross’s Apartment Is Full of Vintage Treasures",
        slug: "Harling-Ross’s-Apartment-Is-Full-of-Vintage-Treasures",
        image: "https://cupofjo.com/wp-content/uploads/2020/10/harling-ross-home-tour-9.jpg",
        content:
            "One of the best guiding companies on Everest has found itself at the center of a lawsuit that could have lasting consequences for the mountaineering world. Last week it was revealed that Madison Mountaineering is being sued by a former client for failing to provide a refund following a failed expedition to the world’s highest peak, If successful, the lawsuit could fundamentally change the client/guide relationship and set a dangerous precedent for future expeditions. A Cancelled ClimbLast fall, Garrett Madison—the founder of Madison Mountaineering—was leading a team of climbers to Mt. Everest. The plan was to make an attempt on the peak from the Nepali side of the mountain, a route that Madison knows well having climbed to the summit on multiple occasions over the past decade. Along the way, he has taken over 60 paying clients with him.Madison has been so successful in fact that he has only failed to put clients on the summit on three occasions out of ten attempts. In 2014, the spring climbing season was cancelled when a serac collapsed, killing 16 porters in the process. A year later, a massive earthquake claimed the lives of another 22 people on the mountain, shutting down that season as well.Autumn of 2019 would be the third time a Madison-led team would be forced to cancel its expedition. When the group of climbers arrived in Base Camp last fall, they found a large chunk of ice—estimated to weigh more than 27,000 pounds— was hanging precariously above the route they would take up the mountain. If it came down at the wrong time, it could spell certain death. Knowing that discretion is the better part of valor, Garrett elected to pull the plug and go home.",

        preview: "Learn how to be the best mountain brawler!",
        shortdesc: "An actual roundabout expression pog",
        createdAt: "October 22, 2020",
        author: "Kraig Becker",
        category: "Design",
        tags: ["Adventure Travel", "Africa", "  ", "Wildlife"],
        comments: 0,
        disabled: false,
        edited: false,
    },
    {
        title: "How to Make Cleaning (More) Enjoyable",
        slug: "How-to-Make-Cleaning-(More)-Enjoyable",
        image: "https://cupofjo.com/wp-content/uploads/2020/10/Caroline-Donofrio-680x1020.jpg",
        content:
            "One of the best guiding companies on Everest has found itself at the center of a lawsuit that could have lasting consequences for the mountaineering world. Last week it was revealed that Madison Mountaineering is being sued by a former client for failing to provide a refund following a failed expedition to the world’s highest peak, If successful, the lawsuit could fundamentally change the client/guide relationship and set a dangerous precedent for future expeditions. A Cancelled ClimbLast fall, Garrett Madison—the founder of Madison Mountaineering—was leading a team of climbers to Mt. Everest. The plan was to make an attempt on the peak from the Nepali side of the mountain, a route that Madison knows well having climbed to the summit on multiple occasions over the past decade. Along the way, he has taken over 60 paying clients with him.Madison has been so successful in fact that he has only failed to put clients on the summit on three occasions out of ten attempts. In 2014, the spring climbing season was cancelled when a serac collapsed, killing 16 porters in the process. A year later, a massive earthquake claimed the lives of another 22 people on the mountain, shutting down that season as well.Autumn of 2019 would be the third time a Madison-led team would be forced to cancel its expedition. When the group of climbers arrived in Base Camp last fall, they found a large chunk of ice—estimated to weigh more than 27,000 pounds— was hanging precariously above the route they would take up the mountain. If it came down at the wrong time, it could spell certain death. Knowing that discretion is the better part of valor, Garrett elected to pull the plug and go home.",

        preview: "",
        shortdesc: "An actual roundabout expression pog",
        createdAt: "October 22, 2020",
        author: "Kraig Becker",
        category: "Relationships",
        tags: ["Adventure Travel", "Africa", "Mountaing", "Running"],
        comments: 0,
        disabled: false,
        edited: false,
    },
    {
        title: "Finding My Own Expressions of Blackness",
        slug: "Finding-My-Own-Expressions-of-Blackness",
        image: "https://cupofjo.com/wp-content/uploads/2020/09/kim-rhodes-cup-of-jo.jpg",
        content:
            "One of the best guiding companies on Everest has found itself at the center of a lawsuit that could have lasting consequences for the mountaineering world. Last week it was revealed that Madison Mountaineering is being sued by a former client for failing to provide a refund following a failed expedition to the world’s highest peak, If successful, the lawsuit could fundamentally change the client/guide relationship and set a dangerous precedent for future expeditions. A Cancelled ClimbLast fall, Garrett Madison—the founder of Madison Mountaineering—was leading a team of climbers to Mt. Everest. The plan was to make an attempt on the peak from the Nepali side of the mountain, a route that Madison knows well having climbed to the summit on multiple occasions over the past decade. Along the way, he has taken over 60 paying clients with him.Madison has been so successful in fact that he has only failed to put clients on the summit on three occasions out of ten attempts. In 2014, the spring climbing season was cancelled when a serac collapsed, killing 16 porters in the process. A year later, a massive earthquake claimed the lives of another 22 people on the mountain, shutting down that season as well.Autumn of 2019 would be the third time a Madison-led team would be forced to cancel its expedition. When the group of climbers arrived in Base Camp last fall, they found a large chunk of ice—estimated to weigh more than 27,000 pounds— was hanging precariously above the route they would take up the mountain. If it came down at the wrong time, it could spell certain death. Knowing that discretion is the better part of valor, Garrett elected to pull the plug and go home.",

        preview: "",
        shortdesc: "An actual roundabout expression pog",
        createdAt: "October 22, 2020",
        author: "Kraig Becker",
        category: "Food",
        tags: ["Adventure Travel", "Sport", "Running", "Wildlife"],
        comments: 0,
        disabled: false,
        edited: false,
    },
];

function filterBlogs(name, type) {
    return tempBlogs.filter((item) => item[type].toLowerCase() === name.toLowerCase());
}

//for now lets find it by slug.
//Implement deslugify later
function findBlog(name) {
    return tempBlogs.find((item) => item.slug.toLowerCase() === name.toLowerCase());
}
function filterBySearch(name) {
    const includeInSearch = ["title", "author"]; // add things you don't want to appear in search
    return tempBlogs.filter((item) => {
        return Object.keys(item).some((key) =>
            includeInSearch.includes(key)
                ? item[key].toString().toLowerCase().includes(name.toLowerCase())
                : false
        );
    });
}

//#region GET ALL
router.get("/", blogsController.getAllBlogs);
//#endregion

//#region GET BLOG BY TITLE
router.get("/:title", blogsController.getBlogByTitle);
//#endregion

//#region get BLOGS by category
router.get("/category/:name", blogsController.getBlogByCategory);
//#endregion

//#region get BLOGS by author
router.get("/author/:name", blogsController.getBlogByAuthor);
//#endregion

//#region get BLOGS by search
router.get("/search/:name", blogsController.getBlogBySearch);
//#endregion

//#region POST
router.post("/", [requireAuth, adminOnly, postBlogValidator], blogsController.create_blog);
//#endregion POST

//#region PUT
router.put("/count-views", putCountViews, blogsController.count_views);
//#endregion PUT

router.get("/tags/:name", (req, res) => {
    const name = req.params.name;
    const filteredBlogs = filterBlogs(name, "tags");
    res.status(200).json(filteredBlogs);
});

module.exports = router;
