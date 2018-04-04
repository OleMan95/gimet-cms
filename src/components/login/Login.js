import React, { Component } from 'react';
import './Login.scss';
import logo from "../../data/logo-black.svg";
import cookiesHelper from "../services/cookies-helper";
import KeyHandler from 'react-key-handler';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			experts:[],
			disabled: false,
			emailValue: '',
			passwordValue: ''
		};
	}

	async componentDidMount() {
	}

	handleInputChange=(event)=>{
		switch (event.target.name) {
			case 'email':
				this.setState({
					emailValue: event.target.value,
				});
				break;
			case 'password':
				this.setState({
					passwordValue: event.target.value,
				});
				break;
			default:
		}
	};

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

		//signin not successful
		if(cookiesHelper.getCookie('lf5')) {
			alert('Forbidden! Try again later.');
			return;
		}

		if(!this.state.emailValue.length > 0 || !this.state.passwordValue.length > 0){
			alert('Please fill in the fields correctly.');
			return;
		}

		//just signin count, it's usable in the server
		const lc2Cookie = cookiesHelper.getCookie('lc2') || 0;
		cookiesHelper.setCookie('lc2', parseInt(lc2Cookie) + 1, {expires: 3600});

		const res = await fetch('/v1/auth/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.emailValue,
				password: this.state.passwordValue,
				lc2: parseInt(lc2Cookie) + 1
			})
		});
		const data = await res.json();

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
					<input type='email' className='' name="email"
					       onChange={(event)=>this.handleInputChange(event)}/>
					<input type='password' className='' name="password"
					       onChange={(event)=>this.handleInputChange(event)} onKeyDown={this.handleKeyDown}/>
	        <button onClick={this.onSignIn} disabled={this.state.disabled} className=''>LOGIN</button>
        </div>
			</div>
		);
	}
}

export default Login;
