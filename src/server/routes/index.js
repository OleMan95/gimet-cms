import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import template from "../template";
import App from "../../components/App";
import Footer from "../../components/partials/Footer";
import {StaticRouter} from 'react-router-dom';
import {Wit, interactive} from 'node-wit';
import Bot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const WIT_TOKEN = process.env.WIT_TOKEN;

const router = express.Router();
const client = new Wit({accessToken: WIT_TOKEN});
const bot = new Bot(TELEGRAM_TOKEN, {polling: true});


bot.onText(/\/echo (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content of the message

	const chatId = msg.chat.id;
	const resp = match[1]; // the captured "whatever"

	// send back the matched "whatever" to the chat
	bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg, match) => {
	const chatId = msg.chat.id;
	const resp = 'Hello, i am @gimet_bot.\n'+
		'Gimet is a platform for creating expert systems.\n'+
		'You can select any expert who is on the Gimet platform.\n'+
		'Ask me anything and i\'ll try to find a suitable expert.\n'+
		'\n'+
		'Register in Gimet to create your own expert: \n'+
		'https://gimet.herokuapp.com/\n'+
		'\n'+
		'For help enter /help.';

	bot.sendMessage(chatId, resp);
});
bot.onText(/\/help/, (msg, match) => {
	const chatId = msg.chat.id;
	const resp = 'Hello, i am @gimet_bot.\n'+
	'Gimet is a platform for creating expert systems.\n'+
	'You can select any expert who is on the Gimet platform.\n'+
	'Ask me anything and i\'ll try to find a suitable expert.\n'+
	'\n'+
	'Register in Gimet to create your own expert: \n'+
	'https://gimet.herokuapp.com/\n'+
	'\n'+
	'For help enter /help.';

	bot.sendMessage(chatId, resp);
});

bot.on('message', async (msg) => {
	console.log(msg.from.first_name, '', msg.from.last_name, ': ', msg.text);

	let message = msg.text;
	const responce = await client.message(message, {});

	if(responce.entities.help && responce.entities.help[0].confidence > 0.7){
		bot.sendMessage(msg.chat.id, 'How i can help you?');
		return;
	}


	// bot.sendMessage(msg.chat.id, 'Sorry, gimet_bot is in developing now.', {
	// 	reply_markup: {
	// 		keyboard: [['Yes'], ['No']]
	// 	}
	// });
	bot.sendMessage(msg.chat.id, 'Sorry, gimet_bot is in developing now.');
});

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

