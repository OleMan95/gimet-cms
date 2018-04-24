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
			const {data} = await apiHelper.getUserData(cookiesHelper.getCookie('at1'));

			console.log('isAdmin: ', data.isAdmin);
			// forbidden to signin
			if(cookiesHelper.getCookie('lf5') || !data.isAdmin) {
				alert('Forbidden! Try again later.');
				this.props.history.push('/');
			}
		}catch(err){
			alert('Forbidden! Try again later.');
			this.props.history.push('/');
		}

	}

	onSubmitClick= async (id, user) => {

		const {data} = await apiHelper.updateUser(
			cookiesHelper.getCookie('at1'),
			id,
			user
		);

		return data;
	};

	render() {
		return (
			<div className="users-page">
				<Header page={'experts'}/>
				<div className="container">
					<Section1 onSubmitClick={this.onSubmitClick} />
				</div>
			</div>
		);
	}
}

export default Users;
