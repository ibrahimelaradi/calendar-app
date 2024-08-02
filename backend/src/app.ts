import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { registerRoutes } from "./router";

import "./config/typebox";
import { registerPassport } from "./passport";

const app = express();

app.use(bodyParser.json());

registerPassport(app);
registerRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port} 🚀`);
});
