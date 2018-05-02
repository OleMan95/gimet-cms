import {Wit, interactive} from 'node-wit';
import Bot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const WIT_TOKEN = process.env.WIT_TOKEN;
const CONFIDENCE_NUM = process.env.CONFIDENCE_NUM;
const client = new Wit({accessToken: WIT_TOKEN});
const bot = new Bot(TELEGRAM_TOKEN, {polling: true});

const helpText = 'Hello, i am @gimet_bot and I have access to all experts in Gimet platform.\n'+
	'Just tell me about your problem and i\'ll try to find a suitable expert.\n'+
	'\n'+
	'You can ask me such questions:\n'+
  '"What are you can?"\n'+
  '"Find a computer expert"\n'+
  '\n'+
  'You can control me using by sending these commands:\n'+
	'/start - start new dialog\n'+
	'/help - show help message\n'+
	'/about - about Gimet\n'+
	'\n'+
	'If you want to create your own expert you can register your account in Gimet: \n'+
	'https://gimet.herokuapp.com/';

bot.onText(/\/about/, (msg, match) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, helpText);
});

bot.onText(/\/start/, (msg, match) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, helpText);
});
bot.onText(/\/help/, (msg, match) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, helpText);
});

bot.on('message', async (msg) => {
	if(!msg.text || msg.text.match(/\/.*/)) return;

	console.log(msg.from.first_name, '', msg.from.last_name, ': ', msg.text);

	let message = msg.text;
	const responce = await client.message(message, {});
	console.log('entities: ', responce.entities);

	if(responce.entities.help && responce.entities.help[0].confidence > CONFIDENCE_NUM){
		bot.sendMessage(msg.chat.id, 'How i can help you?');
		return;
	}
	if(responce.entities.scope && responce.entities.scope[0].confidence > CONFIDENCE_NUM){
		bot.sendMessage(msg.chat.id, helpText);
		return;
	}
	if(responce.entities.find_expert && responce.entities.find_expert[0].confidence > CONFIDENCE_NUM){
    if(responce.entities.expert_object && responce.entities.expert_object[0].confidence > CONFIDENCE_NUM){
      bot.sendMessage(msg.chat.id, `Sorry, I didn\'t find a ${responce.entities.expert_object[0].value} expert.`);
      return;
    }
		bot.sendMessage(msg.chat.id, 'What kind of expert are you looking for?');
		return;
	}else{
    if(responce.entities.expert_object && responce.entities.expert_object[0].confidence > CONFIDENCE_NUM){
      bot.sendMessage(msg.chat.id, `Sorry, I didn\'t find a ${responce.entities.expert_object[0].value} expert.`);
      return;
    }
  }



	// bot.sendMessage(msg.chat.id, 'Sorry, gimet_bot is in developing now.', {
	// 	reply_markup: {
	// 		keyboard: [['Yes'], ['No']]
	// 	}
	// });
	bot.sendMessage(msg.chat.id, 'Sorry, i don\'t understand you.');
});