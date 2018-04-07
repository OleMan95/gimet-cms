import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookiesHelper from "../services/cookies-helper";
import apiHelper from "../services/api-helper";
import './index.scss';

class Section1 extends Component {
	constructor(props){
		super(props);
		this.state = {
			value:''
		};
	}

	handleChange=(event)=>{
		this.setState({value: event.target.value});
	};
	onSearchClick= async () => {
		try {
			const {data} = await apiHelper.getUsers(
				cookiesHelper.getCookie('at1'),
				this.searchInput.value,
				this.state.value
			);
		} catch (err) {
			console.log('error: ', err);
		}
	};

	render() {
		return (
			<div className="section-1">
        <div className="head d-flex justify-content-between">
          <select className="custom-select" value={this.state.value}
                  onChange={this.handleChange}>
	          <option value="" disabled hidden>Search by:</option>
	          <option value="email">email</option>
            <option value="name">name</option>
            <option value="id">id</option>
					</select>
          <div className='search input-group mb-3'>
            <input className="form-control" type='text' ref={elem=>{this.searchInput=elem}}/>
	          <div className="input-group-append">
		          <button className="btn btn-outline-secondary" type="button"
		                  onClick={this.onSearchClick}>SEARCH</button>
	          </div>
					</div>
				</div>


			</div>
		);
	}
}

// Section1.propTypes = {
// 	page: PropTypes.string
// };

export default Section1;
