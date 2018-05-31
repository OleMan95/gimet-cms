import React, { Component } from 'react';
import Header from '../partials/Header';
import Section1 from '../section-1';
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
				<div className="container">
					<Section1 onSubmitClick={this.onSubmitClick} isExpert={true}/>
				</div>
			</div>
		);
	}
}

export default Experts;
