import React, { Component } from 'react';
import Header from '../partials/Header';
import './Experts.scss';

class Experts extends Component {
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
			<div className="experts-page">
        <Header page={'users'}/>
        <div className="content">
	        <p>Experts</p>
	        {
		        this.state.experts.map(function(expert, i){
			        return <li key={i}>{expert.name}</li>
		        })
	        }
        </div>
			</div>
		);
	}
}

export default Experts;
