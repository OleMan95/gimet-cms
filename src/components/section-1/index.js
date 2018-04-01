import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Section1 extends Component {
	constructor(props){
		super(props);
		this.state = {
			experts:[],
			filter: '...',
			searchName: '',
			newExperts:[]
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

    filterChoose=(event)=>{
		this.setState({filter: event.target.value});
	};

	getSearchDataValue =(event)=>{
        if(this.state.filter.toString() === "Expert Name")
        {
            this.setState({searchName: event.target.value});
            console.log(this.state.filter);
        }
    };

	findData=()=>{
		const newdata = this.state.experts.filter(expert =>{
            const name = expert.name.toLowerCase();
			return name.includes(this.state.searchName);
		});
		this.setState({newExperts: newdata});
		console.log(newdata);
	};

	render() {
		return (
			<div className="section-1">
				<h1 className="title">Users</h1>
				<div className="search-box">
                    <div className="search-head">
                        <select className="filter-droplist" onChange={this.filterChoose}>
                            <option value="...">Searching to</option>
                            <option value="Email" onChange={this.filterChoose} >Email</option>
                            <option value="User Name">User name</option>
                            <option value="Expert Name">Expert name</option>
						</select>
                        <p>Enter {this.state.filter}</p>
                        <input type='text' onChange={this.getSearchDataValue} className='search-field'/>
                        <a onClick={this.findData} className='SearchBtn'>SEARCH</a>

					</div>
					<div className="output-area">
                        {
                            this.state.newExperts.map(function(expert, i){
                                return <li key={i}>{expert.name}</li>
                            })
                        }
					</div>

				</div>


				{/*{*/}
				  {/*this.state.experts.map(function(expert, i){*/}
					  {/*return <li key={i}>id: {expert._id}, name: {expert.name}</li>*/}
				  {/*})*/}
				{/*}*/}
			</div>
		);
	}
}

// Section1.propTypes = {
// 	page: PropTypes.string
// };

export default Section1;
