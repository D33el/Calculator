const http = require("http");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const { join } = require("path");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

let baseUrl = path.join(__dirname, "public/");

app.get("/", (req, res) => {
	res.sendFile(baseUrl + "index.html");
});

let port = 640;
const httpServer = http.createServer(app);
httpServer.listen(port, () => console.log(`Sever running on http://localhost:${port}`));
