import React from 'react';
import ReactDOM from 'react-dom';

import '../css/main';

import Greeting from '../components/greeting.jsx';

const LoginControl = React.createClass({
	getInitialState: function() {
		return {isLoggedIn: false}
	},
	handleLoginClick: function() {
		this.setState({isLoggedIn: true});
	},
	handleLogoutClick: function() {
		this.setState({isLoggedIn: false});
	},
	render: function() {
		const isLoggedIn = this.state.isLoggedIn;
		let button = null;
		if(isLoggedIn) {
			button = <LogoutButton onClick={this.handleLogoutClick}></LogoutButton>
		} else {
			button = <LoginButton onClick={this.handleLoginClick}></LoginButton>
		}

		return (
			<div>
				<Greeting isLoggedIn={isLoggedIn}></Greeting>
				{button}
			</div>
			)
	}
})


function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

ReactDOM.render(
	<LoginControl></LoginControl>,
	document.getElementById('root')
);

