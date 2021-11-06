import React, { Component } from 'react';
import './App.css';

class Subject extends Component{
  render(){
    return(
      <header>
        <h1>WEB</h1>
        world wide web!
    </header>
    );
  }
}

class App extends Component {

  render(){
    return (
      <div className="App">
        {/* Hello, React!! */}
        <Subject />
        <TOC />
        <Content />

      </div>
    );
  }
}

class TOC extends Component{
  render(){
    return(
    <nav>
        <ul>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ul>
    </nav>
    );
  }
}

class Content extends Component{
  render(){
    return(
      <article>
      <h2>HTML</h2>        
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, id magnam. Voluptatibus deserunt dolorem odit perferendis quis mollitia in dolorum.
    </article>
    );
  }  
}


export default App;
