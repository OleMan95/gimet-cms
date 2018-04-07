import React, { Component } from 'react';
import Header from '../partials/Header';
import Section1 from '../section-1';
import cookiesHelper from "../services/cookies-helper";
import apiHelper from "../services/api-helper";
import './Users.scss';

class Users extends Component {
	constructor(props){
		super(props);
		this.state = {
			experts:[]
		};
	}

	async componentDidMount() {
		try{
			//token not found
			await apiHelper.getUserData(cookiesHelper.getCookie('at1'));

			// forbidden to signin
			if(cookiesHelper.getCookie('lf5')) {
				alert('Forbidden! Try again later.');
				this.props.history.push('/');
			}
		}catch(err){
			alert('Forbidden! Try again later.');
			this.props.history.push('/');
		}

	}

	render() {
		return (
			<div className="users-page">
				<Header page={'experts'}/>
				<div className="content">
					<Section1 />
				</div>
			</div>
		);
	}
}

export default Users;
