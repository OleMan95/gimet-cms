import React, { Component } from 'react';
import Header from '../partials/Header';
import './Users.scss';
import Section1 from '../section-1';

class Users extends Component {
	constructor(props){
		super(props);
		this.state = {
			experts:[]
		};
	}

	async componentDidMount() {
		const res = await fetch('/v1/experts');
		console.log(res);

		if(res.status === 200){
			this.setState({
				experts: await res.json()
			});
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
