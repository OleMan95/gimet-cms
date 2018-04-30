import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import template from "../template";
import App from "../../components/App";
import Footer from "../../components/partials/Footer";
import {StaticRouter} from 'react-router-dom';

const router = express.Router();

router.get('/v1/message', async (req, res) => {
	res.send('');
});

router.get('*', (req, res)=>{
	// if above are no routes has been found - page routes searching here
	const murkup = renderToString(
		<StaticRouter location={req.url}>
			<App />
		</StaticRouter>
	);
	const footer = renderToString(<Footer />);

	res.send(template({
		body: murkup,
		footer: footer,
		title: 'GIMET-CMS'
	}));
});

export default router;

