import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookiesHelper from "../services/cookies-helper";
import apiHelper from "../services/api-helper";
import './index.scss';

class Section2 extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalBody: '',
			dataToSave: 'yeah!',
			alert: 'Error!',
			alertDangerClass: 'd-none',
			alertInfoClass: 'd-none',
		}
	};

	onModalOpen=()=>{
		try{
			const data = this.props.modalObject.data;
			const isAdmin = data.isAdmin ? 'true' : 'false';
			const isConfirmed = data.isConfirmed ? 'true' : 'false';
			const experts = [];

			data.experts.forEach((expert)=>{
				experts.push(
					<a className="row" href="" key={expert}>{expert}</a>
				);
			});

			if(this.props.modalObject.type === 'user'){
				return (
					<tbody key={data._id}>
						<tr>
							<td>_id</td>
							<td ref={()=>{this.id=data._id}}>{data._id}</td>
						</tr>
						<tr>
							<td>name</td>
							<td>
								<input type="text" className="form-control" defaultValue={data.name} ref={elem=>{this.nameInput=elem}}/>
							</td>
						</tr>
						<tr>
							<td>email</td>
							<td>
								<input type="email" className="form-control" defaultValue={data.email} ref={elem=>{this.emailInput=elem}}/>
							</td>
						</tr>
						<tr>
							<td>isAdmin</td>
							<td>
								<input type="text" className="form-control" defaultValue={isAdmin} ref={elem=>{this.isAdminInput=elem}}/>
							</td>
						</tr>
						<tr>
							<td>isConfirmed</td>
							<td>
								<input type="text" className="form-control" defaultValue={isConfirmed} ref={elem=>{this.isConfirmedInput=elem}}/>
							</td>
						</tr>
						<tr>
							<td>experts</td>
							<td>
								<div className='input-group mb-3'>
									<input className="form-control" type='text' placeholder={'Add new expert'} ref={elem=>{this.addExpertInput=elem}}/>
									<div className="input-group-append">
										<button className="btn btn-outline-secondary" type="button"
										        onClick={this.addExpertClick}>+</button>
									</div>
								</div>
								<div>{experts}</div>
							</td>
						</tr>
					</tbody>
				);
			}
			if(this.props.modalObject.type === 'expert'){

			}
		}catch(err){
			return (
				<tbody>
					<tr>
						<td>Oops!</td>
						<td>Something wrong.</td>
					</tr>
				</tbody>
			);
		}

	};

	onModalClick=(event)=>{
		// handles the parent element click and stop that
		event.stopPropagation();
	};

	onSubmitClick= async () => {
		console.log('isAdmin: ', this.isAdminInput.value);
		console.log('isAdminInput: ', this.isAdminInput.value.indexOf('true'));

		try{
			let dataToSave = {};
			if (this.props.modalObject.type === 'user') {

				let isAdmin = this.isAdminInput.value.indexOf('true') > -1;
				let isConfirmed = this.isConfirmedInput.value.indexOf('true') > -1;

				dataToSave.name = this.nameInput.value.length > 0 ? this.nameInput.value : this.makeError();
				dataToSave.email = this.emailInput.value.length > 0 ? this.emailInput.value : this.makeError();
				dataToSave.isAdmin = isAdmin;
				dataToSave.isConfirmed = isConfirmed;
			}

			let response = await this.props.onSubmitClick(this.id, dataToSave);

			if(response._id == this.id){
				this.alertHelper('Success! ');
				this.props.onCloseClick();
			}

		}catch(err){
			console.log('Error: ', err);
			this.alertHelper(err.message, 'danger');
		}

	};

	makeError=()=>{
		throw new Error('Fill the fields correctly');
	};

	addExpertClick=()=>{

	};


	render() {
		let tableBody = this.onModalOpen();
		return (
			<div className="section-2">
				<div className={"modal bd-example-modal-lg "+this.props.showModal} onClick={this.props.onCloseClick} tabIndex="-1" role="dialog">
					<div className="modal-dialog modal-dialog-centered" onClick={this.onModalClick} role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Edit {this.props.modalObject.type}</h5>
								<button type="button" onClick={this.props.onCloseClick} className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<table className="table table-striped table-hover">
									<thead className="thead-dark">
									<tr>
										<th scope="col">field</th>
										<th scope="col">value</th>
									</tr>
									</thead>
									{tableBody}
								</table>
							</div>

							<div className="modal-footer">
								<button type="button" onClick={this.onSubmitClick} className="btn btn-primary">Save changes</button>
								<button type="button" onClick={this.props.onCloseClick} className="btn btn-secondary" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>

				<div className={"alert alert-danger "+this.state.alertDangerClass} role="alert">
					{this.state.alert}
				</div>
				<div className={"alert alert-info "+this.state.alertInfoClass} role="alert">
					{this.state.alert}
				</div>

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

Section2.propTypes = {
	showModal: PropTypes.string,
	onCloseClick: PropTypes.func,
	modalObject: PropTypes.object
};

export default Section2;
