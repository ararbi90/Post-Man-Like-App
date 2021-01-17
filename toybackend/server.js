const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/val", (req, res) => {
    console.log(req.query)
    console.log("/");
    return res.json(req.query);
})

app.listen(port, () => {
    console.log(`Server is running on port: ` + port);
});
