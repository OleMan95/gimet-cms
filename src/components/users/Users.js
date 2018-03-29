import React, { Component } from 'react';
import Header from '../partials/Header';
import './Users.scss';

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
	        <p>Users</p>
	        {
		        this.state.experts.map(function(expert, i){
			        return <li key={i}>id: {expert._id}, name: {expert.name}</li>
		        })
	        }
        </div>
			</div>
		);
	}
}

export default Users;
