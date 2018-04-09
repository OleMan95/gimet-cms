import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookiesHelper from "../services/cookies-helper";
import apiHelper from "../services/api-helper";
import './index.scss';

class Section2 extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalBody: ''
		};
	}

	onModalOpen=()=>{
		try{
			const data = this.props.modalObject.data;
			const isAdmin = data.isAdmin ? 'true' : 'false';
			const experts = [];

			data.experts.forEach((expert)=>{
				experts.push(
					<a className="row" href="">{expert}</a>
				);
			});

			if(this.props.modalObject.type === 'user'){
				return (
					<tbody key={data._id}>
						<tr>
							<td>_id</td>
							<td>{data._id}</td>
						</tr>
						<tr>
							<td>name</td>
							<td>
								<input type="text" className="form-control" placeholder={data.name}/>
							</td>
						</tr>
						<tr>
							<td>email</td>
							<td>
								<input type="email" className="form-control" placeholder={data.email}/>
							</td>
						</tr>
						<tr>
							<td>isAdmin</td>
							<td>
								<input type="text" className="form-control" placeholder={isAdmin}/>
							</td>
						</tr>
						<tr>
							<td>experts</td>
							<td><div>{experts}</div></td>
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
								<button type="button" className="btn btn-primary">Save changes</button>
								<button type="button" onClick={this.props.onCloseClick} className="btn btn-secondary" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
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
