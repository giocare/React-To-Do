import React from 'react';
import './App.css';
import Login from "./components/Login"
import Todos from "./components/Todos"
import Logout from "./components/Logout"
import List from "./components/List"


class App extends React.Component {
 

    state = {
      id: undefined,
      name: undefined,
      token: undefined,
      new_task: undefined,
      delete_task: undefined,
      update_task: true,
      fetchData: []
    }


  getUsername = async (e) => {
    e.preventDefault();
    const input_username = e.target.elements.name.value;
    
    const username = await fetch(`https://hunter-todo-api.herokuapp.com/user?username=${input_username}`);
    const data = await username.json();

      this.setState({
        id: data[0]["id"],
        name: data[0]["username"],
      });

    var url = 'https://hunter-todo-api.herokuapp.com/auth';
    var auth_username = {"username" : input_username};

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(auth_username),
      }).then(res => res.json())
      .then(response => {
        const roken = JSON.stringify(response);
        const parser = JSON.parse(roken);
        var toke = parser.token;
        this.setState({
          token: toke
        })
      });
}

createUsername = async(u) => {
  u.preventDefault();
  const new_username = u.target.elements.name.value;
  console.log(new_username);
  var new_user = {"username" : new_username};
  var auth_url = 'https://hunter-todo-api.herokuapp.com/auth';

  
  fetch('https://hunter-todo-api.herokuapp.com/user', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(new_user),
    }) //.then(res => console.log(res.status))
    .then(response => { 
      let error = "That username is taken. Please try again.";
      if(response.status === 409){
        document.getElementById('error').innerHTML = error;
    }
    else {
      this.setState({
        name: new_username
      })
      fetch(auth_url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(new_user),
      }).then(res => res.json())
      .then(response => {
        const roken = JSON.stringify(response);
        const parser = JSON.parse(roken);
        var toke = parser.token;
        this.setState({
          token: toke
        })
      })
    }
    


  } 
    ) 

}

returnTodos = () => {
      var cookie = {"sillyauth" : this.state.token};
      //console.log(cookie);
      fetch('https://hunter-todo-api.herokuapp.com/todo-item', {
        method: 'GET', // or 'PUT'
        headers: cookie
      })
      .then(res => { return res.json()})
      .then((data) => { 
        this.setState({
        fetchData: data});
  })


}


addTask = async(c) => {
  c.preventDefault();
  var cookie = {"sillyauth" : this.state.token};
  var todo_url = 'https://hunter-todo-api.herokuapp.com/todo-item';
  //console.log('From addTask()', cookie); 
  const new_task = c.target.elements.new_task.value;
  var adding_todo = {"content" : new_task};
  console.log(new_task);
  
fetch(todo_url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(adding_todo),
    headers: cookie,
    }).then(this.setState({
          new_task: true
        }))
}


removeTodo = (taskid) => {
  var cookie = {"sillyauth" : this.state.token};
  console.log("button with id " + taskid + " was clicked")

   fetch(`https://hunter-todo-api.herokuapp.com/todo-item/${taskid}`, {
        method: 'DELETE', // or 'PUT'
        headers: cookie
      })
      .then(this.setState({
          delete_task: true
        }))

}

updateTodo = (taskid) => {
  var cookie = {"sillyauth" : this.state.token};
  var completed = {"completed" : true};

  fetch(`https://hunter-todo-api.herokuapp.com/todo-item/${taskid}`, {
        method: 'PUT', // or 'PUT'
        headers: cookie,
        body: JSON.stringify(completed)
      }) .then(this.setState({
          update_task: true
        }))
}

logOut = (e) => {
  e.preventDefault();
  this.setState({
    id: undefined,
    name: undefined,
    token: undefined,
    new_task: undefined,
    fetchData: []
  })
}
    render() {
    if(this.state.token === undefined)
      return (
        <Login getUsername={this.getUsername} createUsername={this.createUsername}/>
        );
    else
      return (
        <div className="wrapper">
        <Logout logOut={this.logOut}/>
          <Todos id={this.state.id} username={this.state.name} token={this.state.token} todos={this.returnTodos()} addTask={this.addTask}  />
          <List contacts={this.state.fetchData} removeTodo={this.removeTodo} updateTodo={this.updateTodo} />
        </div>
      );
  }
}
export default App;






