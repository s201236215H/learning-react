import React from 'react';
import ReactDOM from 'react-dom';

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

export class Greeting extends React.Component {
	constructor(props) {
		super(props);
		const isLoggedIn = props.isLoggedIn;

	}



	render() {
		if(this.isLoggedIn) {
			return <UserGreeting></UserGreeting>;
		} else {
			return <GuestGreeting></GuestGreeting>;
		}
	}
}

export default Greeting;