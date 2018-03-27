import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import template from "../template";
const router = express.Router();
import App from "../../components/App";


router.get('/', (req, res)=>{
	const appString = renderToString(<App />);

	res.send(template({
		body: appString,
		title: 'GIMET-CMS'
	}));
});

export default router;

