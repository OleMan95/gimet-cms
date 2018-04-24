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
			alert: 'Error!',
			alertDangerClass: 'd-none',
			alertInfoClass: 'd-none',
			userExperts: [],
			id: '',
			tableBody: (
				<tr>
					<td></td>
					<td></td>
				</tr>
			)
		}
	};

	async componentDidMount() {
		let tableBody = this.state.tableBody;

		try {
			const data = this.props.modalObject.data;
			const isAdmin = data.isAdmin ? 'true' : 'false';
			const isConfirmed = data.isConfirmed ? 'true' : 'false';

			this.setState({
				userExperts: data.experts,
				id: data._id
			});

			if (this.props.modalObject.type === 'user') {
				tableBody = [
					<tr key={'1'}>
						<td>_id</td>
						<td>{data._id}</td>
					</tr>,
					<tr key={'2'}>
						<td>name</td>
						<td>
							<input type="text" className="form-control" defaultValue={data.name} ref={elem => {
								this.nameInput = elem
							}}/>
						</td>
					</tr>,
					<tr key={'3'}>
						<td>email</td>
						<td>
							<input type="email" className="form-control" defaultValue={data.email} ref={elem => {
								this.emailInput = elem
							}}/>
						</td>
					</tr>,
					<tr key={'4'}>
						<td>isAdmin</td>
						<td>
							<input type="text" className="form-control" defaultValue={isAdmin} ref={elem => {
								this.isAdminInput = elem
							}}/>
						</td>
					</tr>,
					<tr key={'5'}>
						<td>isConfirmed</td>
						<td>
							<input type="text" className="form-control" defaultValue={isConfirmed} ref={elem => {
								this.isConfirmedInput = elem
							}}/>
						</td>
					</tr>
				];
			}
			if (this.props.modalObject.type === 'expert') {

			}
		} catch (err) {
			console.log('err: ', err.message);

			this.alertHelper(err.message, 'danger');

			tableBody = (
				<tr>
					<td>Oops!</td>
					<td>Something wrong.</td>
				</tr>
			);
		}

		this.setState({tableBody});
	};

	onModalClose=()=>{
		this.setState({
			tableBody: (
				<tr>
					<td></td>
					<td></td>
				</tr>
			)
		});
		this.props.onCloseClick();
	};

	onModalClick=(event)=>{
		// handles the parent element click and stop that
		event.stopPropagation();
	};

	onSubmitClick= async () => {

		try{
			let dataToSave = {};
			if (this.props.modalObject.type === 'user') {

				let isAdmin = this.isAdminInput.value.indexOf('true') > -1;
				let isConfirmed = this.isConfirmedInput.value.indexOf('true') > -1;
				let experts = this.state.userExperts;

				dataToSave.name = this.nameInput.value.length > 0 ? this.nameInput.value : this.makeError();
				dataToSave.email = this.emailInput.value.length > 0 ? this.emailInput.value : this.makeError();
				dataToSave.isAdmin = isAdmin;
				dataToSave.isConfirmed = isConfirmed;
				dataToSave.experts = experts;

				console.log('dataToSave experts: ', experts);

			}

			let response = await this.props.onSubmitClick(this.state.id, dataToSave);

			if(response._id == this.state.id){
				this.alertHelper('Success!');
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
		let experts = this.state.userExperts;
		experts.push(this.addExpertInput.value);

		this.setState({
			userExperts: experts,
		});
	};
	deleteExpertClick=(elem)=>{
		console.log('experts: ',elem.target.id);
		let experts = this.state.userExperts;

		experts = experts.filter((exp)=>{
			return exp != elem.target.id;
		});

		console.log('experts: ', experts);

		this.setState({
			userExperts: experts,
		});
	};


	render() {
		return <div className="section-2">
			<div className={"modal bd-example-modal-lg show"} onClick={this.onModalClose} tabIndex="-1" role="dialog">
				<div className="modal-dialog modal-dialog-centered" onClick={this.onModalClick} role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit {this.props.modalObject.type}</h5>
							<button type="button" onClick={this.onModalClose} className="close" data-dismiss="modal"
							        aria-label="Close">
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
								{this.props.modalObject.data ?
									<tbody>
									{this.state.tableBody}
									<tr>
										<td>experts</td>
										<td>
											<div className='input-group mb-3'>
												<input className="form-control" type='text' placeholder={'Add new expert'} ref={elem => {
													this.addExpertInput = elem
												}}/>
												<div className="input-group-append">
													<button className="btn btn-outline-secondary" type="button"
													        onClick={this.addExpertClick}>+
													</button>
												</div>
											</div>
											{this.state.userExperts.map((expert, index)=>
												<div key={expert}>
													<a href="">{expert}</a>
													<button className="btn btn-outline-secondary" type="button" id={expert}
													        onClick={(elem)=>{this.deleteExpertClick(elem)}}>x
													</button>
													<br/>
												</div>
											)}
										</td>
									</tr>
									</tbody>
									:
									<tbody>
										<tr>
											<td>Oops!</td>
											<td>Something wrong.</td>
										</tr>
									</tbody>
								}

							</table>
						</div>

						<div className="modal-footer">
							<button type="button" onClick={this.onSubmitClick} className="btn btn-primary">Save changes</button>
							<button type="button" onClick={this.onModalClose} className="btn btn-secondary" data-dismiss="modal">Close
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className={"alert alert-danger " + this.state.alertDangerClass} role="alert">
				{this.state.alert}
			</div>
			<div className={"alert alert-info " + this.state.alertInfoClass} role="alert">
				{this.state.alert}
			</div>

		</div>;
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
