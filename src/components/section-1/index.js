import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Section1 extends Component {
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
      <div className="search-1">
	      <h1 className="title">search</h1>
	      <p>Users</p>
	      {
		      this.state.experts.map(function(expert, i){
			      return <li key={i}>id: {expert._id}, name: {expert.name}</li>
		      })
	      }
      </div>
		);
	}
}

// Section1.propTypes = {
// 	page: PropTypes.string
// };

export default Section1;
