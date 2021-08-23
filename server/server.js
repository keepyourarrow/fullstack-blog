require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { authenticateToken } = require("./middleware/authMiddleware");

const port = process.env.PORT || 8000;

//#region - where we connect to monngodb

const { prisma } = require("./lib/prisma.js");
const { countPageVisits } = require("./middleware/countPageVisits");

app.get("/test", async (req, res) => {
    console.log("logged");
    const user = await prisma.user.create({
        data: {
            email: "elsa4@prisma.io",
            userName: "Elsa Prisma4",
            password: "Elsa Prisma",
        },
    });

    res.json({ user: user });
});
app.listen(port, () => console.log(`Listening on Port ${port}`));

//#region configure express
app.use(cors()); // We will allow Cross Origin Request.
app.use(express.json()); // We will use JSON
// app.use(express.urlencoded({ extended: true })); // Fixes for understanding post requests
app.use(cookieParser());

// custom auth middleware
//#endregion

app.use(countPageVisits);

//#region -  define our routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
//#endregion

// module.exports.prisma = prisma;
