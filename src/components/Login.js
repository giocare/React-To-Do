import React from "react";

const Login = props => (
<div className="login">
	<form onSubmit = {props.getUsername}>
		<h4>Login</h4>

		<input id='login_input' type="text" name="name" placeholder="Username..."/>
		<button className='btn'>Submit</button>
		<p id="login_issue"></p>
	</form>

	<form onSubmit = {props.createUsername}>
		<h4>Register</h4>

		<input type="text" name="name" placeholder="New Username..."/>
		<button className='btn'>Submit</button>
		<p id="error"></p>
	</form>
 </div>
	

);

export default Login