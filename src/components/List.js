// function Contact(props) {
//   return (
//     <div className="contact">
//     <ul>
//     <li>{props.content}</li>
//     </ul>
      
//     </div>
//   );
// }

     
    	 // <button onClick={() => { props.removeTodo(c.id) }}>Delete</button> 
    	 // <button onClick={() => { props.updateTodo(c.id) }}>Update</button></li>)}

import React from "react";


function List(props) {
  return (
  	
    <div className="enter">{props.contacts.map(c => 
    	{ if (c.completed) 
    		{ return <li><strike>{c.content}</strike> <button onClick={() => { props.removeTodo(c.id) }}>Delete</button></li>  }
    	  else 
    	 	{ return <li>{c.content} <button onClick={() => { props.removeTodo(c.id) }}>Delete</button> <button onClick={() => { props.updateTodo(c.id) }}>Update</button> </li> }
    	}

    )}
    </div>
  );
}




export default List;


