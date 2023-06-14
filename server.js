const express = require('express');
const router = require('./routes/record.js');
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json())
app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
