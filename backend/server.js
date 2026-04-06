const app = require("./src/app");
const connectDb = require("./src/config/database");

let dbPromise;

function initDb() {
    if (!dbPromise) {
        dbPromise = connectDb();
    }
    return dbPromise;
}

module.exports = async (req, res) => {
    try {
        await initDb();
        return app(req, res);
    } catch (error) {
        console.error("Startup failed:", error.message);
        return res.status(500).json({ message: "Server startup failed" });
    }
};

if (require.main === module) {
    const port = process.env.PORT || 3000;
    initDb()
        .then(() => {
            app.listen(port, () => {
                console.log(`server listening on port ${port}`);
            });
        })
        .catch((error) => {
            console.error("Startup failed:", error.message);
            process.exit(1);
        });
}
