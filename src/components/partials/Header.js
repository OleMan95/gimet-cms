import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import logo from "../../data/logo.svg";
import cookiesHelper from "../services/cookies-helper";
import './Header.scss';

class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}

	onLogout=()=>{
		cookiesHelper.setCookie('at1', "", {expires: -1});
	};

	render() {
		return (
      <header className="header">
	      <div className="d-flex container">
		      <a href={'/'} className={'title d-flex align-items-center'}>
			      <img src={logo} alt={'logo'}/>
			      <h1 className="">GIMET CMS</h1>
		      </a>

		      <div className={'h-100 d-flex'}>
			      <Link to={'/users'} className={this.props.page == 'users' ? "btn btn-page d-flex align-items-center"
				      : "btn btn-page d-flex align-items-center active"}>Users</Link>
			      <Link to={'/experts'} className={this.props.page == 'experts' ? "btn btn-page d-flex align-items-center"
				      : "btn btn-page d-flex align-items-center active"}>Experts</Link>
			      <a href="/" className="btn logout d-flex align-items-center" onClick={this.onLogout}>logout</a>
		      </div>
	      </div>
      </header>
		);
	}
}

Header.propTypes = {
	page: PropTypes.string
};

export default Header;
