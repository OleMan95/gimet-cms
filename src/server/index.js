import './bootstrap';
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import path from "path";
import logger from "morgan";
import cookieParser from 'cookie-parser';

import routes from "./routes/index"
import experts from "./routes/experts"
import users from "./routes/users"
import "./services/telegram-bot"

const app = express();
app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({msExtendedCode: false}));
app.use(express.static('public'));

app.use('/v1', experts);
app.use('/v1', users);
app.use('/', routes);

app.listen(process.env.PORT || 4000, ()=>{
	console.log('Server is listening...');
});