import React, { Component } from 'react';
import './Login.scss';
import logo from "../../data/logo-black.svg";


class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			experts:[]
		};
	}

	async componentDidMount() {

	}

	render() {
		return (
			<div className="login-page">
				<div className="header">
					<img src={logo} alt="gimet_logo"/>
					<p>GIMET-CMS</p>
				</div>
        <div className="form">
					<input type='email' className=''/>
					<input type='password' className=''/>
	        <a href='/users' className=''>LOGIN</a>
        </div>
			</div>
		);
	}
}

export default Login;
