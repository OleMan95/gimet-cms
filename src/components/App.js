import React, { Component } from 'react';
import './App.css';
import Header from './partials/Header';

class App extends Component {

	render() {
		return (
			<div className="App">
        <Header />
        <div className="App-Content">
        </div>
        <footer className="App-footer">
          <p>Author: Oleksii Manachynskyi</p>
        </footer>
			</div>
		);
	}
}

export default App;
