"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contents = __importStar(require("./data/Contents.json"));
const plantsInfo = __importStar(require("./data/PLNT20.json"));
const plantGeneration = __importStar(require("./data/GEN20.json"));
const app = (0, express_1.default)();
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
    const generationData = Object.values(plantGeneration);
    const topN = +params.top;
    res.send(topN);
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map