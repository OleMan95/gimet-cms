import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import path from "path";
import logger from "morgan";

import routes from "./routes/index"

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({msExtendedCode: false}));
app.use(express.static('public'));

app.use('/', routes);

app.listen(process.env.PORT || 3000, ()=>{
	console.log('Server is listening...');
});