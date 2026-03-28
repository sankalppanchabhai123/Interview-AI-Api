const app = require("./src/app");
const connectDb = require("./src/config/database");
const { tempResult: invokeGeminiAi } = require("./src/controllers/interview.controllers");

connectDb();
invokeGeminiAi();

app.listen(3000, () => {
    console.log("server listening on port 3000")
})