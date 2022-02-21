import express from "express";
import fs from "fs";
import * as contents from "./data/Contents.json";
import * as plantsInfo from "./data/PLNT20.json";
import * as plantGeneration from "./data/GEN20.json";


const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get('/powerplants/data/contents', (req, res) => {
    res.send(contents);
});

app.get('/powerplants/data/plants', (req, res) => {
    res.send(plantsInfo);
});

app.get('/powerplants/generation', (req, res) => {
    res.send(plantGeneration);
});

app.get('/powerplants/data/:top', (req, res) => {
    const params = req.params;
    const generationData: any[] = Object.values(plantGeneration);
    const topN: number = +params.top;
    res.send(topN);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});