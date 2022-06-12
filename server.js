const express = require("express");
const mongoose = require("mongoose");
const { ServerApiVersion } = require('mongodb');
const Router = require("./routes");
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());

app.use(express.json());
// Connect to the MongoDB cluster
mongoose.connect('mongodb+srv://NaveenSharma:NaveenSharma@cluster0.fcy1t.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DataBace Connected")).catch((er) => console.log(er));

app.use(cors());
app.use(Router);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});