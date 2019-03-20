import React from "react";

// <p>Your id is {props.id}</p>
// 		<p>Your token is {props.token}</p>


const Todos = props => (
	<div className="todopage">

		<form id="new_task" onSubmit = {props.addTask}>
			<input type="text" name="new_task" placeholder="enter new task..."/>
			<button className="btn">Submit</button>
	</form>

		<h2>Welcome back {props.username}. Here is your to-do list: </h2>
		
	</div>


);

export default Todos;