import React, { Component } from 'react';
import './Users.css';
import Header from '../partials/Header';

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
			<div className="App">
        <Header />
        <div className="">
	        <p>Users</p>
	        {
		        this.state.experts.map(function(expert, i){
			        console.log('test');
			        return <li key={i}>{expert.name}</li>
		        })
	        }
        </div>
        <footer className="App-footer">
          <p>Authors:</p>
          <a href="/">Oleksii Manachynskyi</a>
          <a href="/">Roman Suprun</a>
        </footer>
			</div>
		);
	}
}

export default Users;
