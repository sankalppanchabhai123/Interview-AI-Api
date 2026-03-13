
const app = express();
const connectDb = require("./config/database");

connectDb();
app.get('/', (req, res) => {
    return res.send("server is in building phase");
})

export default app;
module.exports = app;