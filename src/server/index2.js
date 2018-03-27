import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import path from "path";
import logger from "morgan";

import bodyParser from "body-parser";
import hbs from "express-handlebars";

import App from "../components/App";
import routes from "./routes/index"
import template from "./template";

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({msExtendedCode: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);

app.get('/', (req, res)=>{
	res.render('index', {root: 'YES!!!'});
});
// // app.get("*", (req, res)=>{
// // 	res.send(`
// 		<!DOCTYPE html>
// 		<html lang="en">
// 			<head>
// 			    <meta charset="UTF-8">
// 			    <title>GIMET CMS</title>
// 			    <link rel="stylesheet" href="/css/main.css">
// 			    <script src="/bundle.js" defer></script>
// 			</head>
// 			<body>
// 				<div id="root">${renderToString(<App/>)}</div>
// 			</body>
// 		</html>
// // 	`);
// // });

app.get('/', (req, res)=>{
	const appString = renderToString(<App />);

	res.send(template({
		body: appString,
		title: 'Hello World from the server',
		initialState: JSON.stringify(initialState)
	}));
});

app.listen(process.env.PORT || 3000, ()=>{
	console.log('Server is listening');
});