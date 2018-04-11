import React, { Component } from 'react';
import './Login.scss';
import logo from "../../data/logo-black.svg";
import cookiesHelper from "../services/cookies-helper";
import apiHelper from "../services/api-helper";
import KeyHandler from 'react-key-handler';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			experts:[],
			disabled: false,
		};
	}

	async componentDidMount() {
		try{
			const {data} = await apiHelper.getUserData(cookiesHelper.getCookie('at1'));
			console.log('isAdmin: ', data.isAdmin);

			this.props.history.push('/users');
		}catch(err){
		}
	}

	handleKeyDown=(event)=>{
		switch (event.key) {
			case "Enter":
				this.onSignIn();
				break;
			default:
				return;
		}
	};

	onSignIn= async () => {
		/**
		 * at1 - authorization token
		 * lc2 - login count
		 * lf5 - login forbidden
		 * */

		const emailValue = this.emailInput.value;
		const passwordValue = this.passwordInput.value;

		//signin not successful
		if(cookiesHelper.getCookie('lf5')) {
			alert('Forbidden! Try again later.');
			return;
		}

		if(!emailValue.length > 0 || !passwordValue.length > 0){
			alert('Please fill in the fields correctly.');
			return;
		}

		//just signin count, it's usable in the server
		const lc2Cookie = cookiesHelper.getCookie('lc2') || 0;
		cookiesHelper.setCookie('lc2', parseInt(lc2Cookie) + 1, {expires: 3600});

		const {res, data} = await apiHelper.singin(emailValue, passwordValue, parseInt(lc2Cookie) + 1);

		//signin successful
		if(data.data && data.data.token){
			cookiesHelper.setCookie('at1', data.data.token);
			cookiesHelper.setCookie('lc2', "", {expires: -1});
			this.props.history.push('/users');
		}
		console.log('res.status: ',res.status);

		if(res.status == 403){
			cookiesHelper.setCookie('lf5', 'true', {expires: 3600});
			this.setState({
					disabled: true
			});
			alert('Forbidden! Try again later.');
		}
	};

	render() {
		return (
			<div className="login-page">
				<KeyHandler keyEventName={'keydown'} keyValue="Enter" onKeyHandle={this.onSignIn} />
				<div className="header">
					<img src={logo} alt="gimet_logo"/>
					<p>GIMET-CMS</p>
				</div>
        <div className="form">
					<input type='email' className='form-control' name="email"
					       ref={elem=>{this.emailInput = elem}}/>
					<input type='password' className='form-control' name="password"
					       onKeyDown={this.handleKeyDown}
					       ref={elem=>{this.passwordInput = elem}}/>
	        <button onClick={this.onSignIn} disabled={this.state.disabled} className="btn">LOGIN</button>
        </div>
			</div>
		);
	}
}

export default Login;
