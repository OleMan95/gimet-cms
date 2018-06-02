import React, { Component } from 'react';
import Header from '../partials/Header';
import Section1 from '../section-1';
import './Experts.scss';
import cookiesHelper from "../services/cookies-helper";
import apiHelper from "../services/api-helper";

class Experts extends Component {
	constructor(props){
		super(props);
		this.state = {
			experts:[]
		};
	}

	async componentDidMount() {
		try{
			//token not found
			const {data} = await apiHelper.getAdminData(cookiesHelper.getCookie('at1'));

			console.log('isAdmin: ', data.isAdmin);
			// forbidden to signin
			if(cookiesHelper.getCookie('lf5') || !data.isAdmin) {
				alert('Forbidden! Try again later.');
				this.props.history.push('/');
			}
		}catch(err){
			alert('Error: '+err.message);
			this.props.history.push('/');
		}
	}

	onSubmitClick= async (id, expert) => {
		const {data} = await apiHelper.updateExpert(
			cookiesHelper.getCookie('at1'),
			id,
			expert
		);

		return data;
	};

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
