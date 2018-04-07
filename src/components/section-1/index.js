import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Section1 extends Component {
	constructor(props){
		super(props);
		this.state = {
			value:''
		};
	}

	handleChange=(event)=>{
		// console.log('value: ',event.target.value);
		// this.setState({selectValue: event.target.value});
		this.setState({value: event.target.value});
	};
	handleInputChange=(event)=>{
		// console.log('value: ',event.target.value);
	};
	onSearchClick=()=>{
		console.log(this.state.value);
	};
	handleSubmit(event) {
		console.log(this.state.value);
	}

	render() {
		return (
			<div className="section-1">
        <div className="head">
          <select value={this.state.value} onChange={this.handleChange}>
	          <option value="" disabled hidden>Search by:</option>
	          <option value="email">email</option>
            <option value="name">name</option>
            <option value="id">id</option>
					</select>
          <div className='search'>
            <input type='text' onChange={this.handleInputChange}/>
            <button onClick={this.onSearchClick}>SEARCH</button>
					</div>
				</div>

				<div className="output-area">
				</div>

			</div>
		);
	}
}

// Section1.propTypes = {
// 	page: PropTypes.string
// };

export default Section1;
