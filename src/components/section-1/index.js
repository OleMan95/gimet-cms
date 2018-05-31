import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section2 from "../section-2";
import cookiesHelper from "../services/cookies-helper";
import apiHelper from "../services/api-helper";
import './index.scss';

class Section1 extends Component {
	constructor(props){
		super(props);
		this.state = {
			value:'',
			dataList: [],
			alert: 'Error!',
			alertDangerClass: 'd-none',
			alertInfoClass: 'd-none',
			showModal: '',
			modalObject: {},
		};
	}

	handleChange=(event)=>{
		this.setState({value: event.target.value});
	};
	onSearchClick= async () => {
		const str = this.searchInput.value.trim();
		const dataList = [];

		try {
			if(this.props.isUser){

				const {data} = await apiHelper.getUsers(
					cookiesHelper.getCookie('at1'),
					this.state.value,
					str
				);

				if(!data.length>0) this.alertHelper('No users found!');

				for(let i=0; i<data.length; i++){
					dataList.push(
						<tr key={data[i]._id} onClick={()=>this.onUserClick(data[i]._id)}>
							<th scope="row">{i+1}</th>
							<td>{data[i]._id}</td>
							<td>{data[i].name}</td>
							<td>{data[i].email}</td>
							<td>{data[i].experts.length}</td>
						</tr>
					);
				}
			}
			if(this.props.isExpert){
				const {data} = await apiHelper.getExperts(
					cookiesHelper.getCookie('at1'),
					this.state.value,
					str
				);

				if(!data.length>0) this.alertHelper('No users found!');

				for(let i=0; i<data.length; i++){
					dataList.push(
						<tr key={data[i]._id} onClick={()=>this.onExpertClick(data[i]._id)}>
							<th scope="row">{i+1}</th>
							<td>{data[i]._id}</td>
							<td>{data[i].name}</td>
							<td>{data[i].author}</td>
							<td>{data[i].questions.length}</td>
							<td>{data[i].contributors.length}</td>
						</tr>
					);
				}
			}

			this.setState({dataList});

		}catch (err) {
			console.log('error: ', err);
			this.alertHelper(err.message, 'danger');
		}
	};

	onUserClick= async (id) => {
		try{

			const {data} = await apiHelper.getUserData(
				cookiesHelper.getCookie('at1'),
				id
			);

			console.log('onUserClick', data);

			this.setState({
				showModal: (
					<Section2 onCloseClick={this.onModalCloseClick}
					          onSubmitClick={this.props.onSubmitClick}
					          modalObject={{type: 'user',data: data}}/>
				)
			});
		}catch(err){
			console.log('Error: ',err);
			this.alertHelper(err.message, 'danger');
		}

	};
	onExpertClick= async (id) => {
		try{
			console.log(id);
		}catch(err){
			console.log('Error: ',err);
			this.alertHelper(err.message, 'danger');
		}

	};
	onModalCloseClick=()=>{
		this.setState({
			showModal: ''
		});
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

				{this.props.isUser ?
					<table className="table table-striped table-hover">
						<thead className="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Experts</th>
						</tr>
						</thead>
						<tbody>
						{this.state.dataList}
						</tbody>
					</table>
					: ''
				}

				{this.props.isExpert ?
					<table className="table table-striped table-hover">
						<thead className="thead-dark">
						<tr>
							<th scope="col-1">#</th>
							<th scope="col-3">ID</th>
							<th scope="col-3">Name</th>
							<th scope="col-3">Author</th>
							<th scope="col-1">Questions</th>
							<th scope="col-1">Contributors</th>
						</tr>
						</thead>
						<tbody>
						{this.state.dataList}
						</tbody>
					</table>
					: ''
				}


				<div className={"alert alert-danger "+this.state.alertDangerClass} role="alert">
					{this.state.alert}
				</div>
				<div className={"alert alert-info "+this.state.alertInfoClass} role="alert">
					{this.state.alert}
				</div>

				{this.state.showModal}

			</div>
		);
	}

	alertHelper=(message, type)=>{
		if(type === 'danger'){
			this.setState({
				alert: message,
				alertDangerClass: 'alert-opacity'
			});
			setTimeout(()=>{
				this.setState({
					alert: 'Error!',
					alertDangerClass: 'd-none'
				});
			}, 4000);
		}else{
			this.setState({
				alert: message,
				alertInfoClass: 'alert-opacity'
			});
			setTimeout(()=>{
				this.setState({
					alert: 'Error!',
					alertInfoClass: 'd-none'
				});
			}, 4000);
		}

	}
}

Section1.propTypes = {
	isUser: PropTypes.bool,
	isExpert: PropTypes.bool,
	onSubmitClick: PropTypes.func
};

export default Section1;
