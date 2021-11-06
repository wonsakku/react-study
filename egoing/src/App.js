import React, { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css';


class App extends Component {

  render(){
    return (
      <div className="App">
        {/* Hello, React!! */}
        <Subject title="WEB" sub="world wide web!" />
        <Subject title="React" sub="Hello React!" />
        <TOC />
        <Content title="HTML" sub="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, id magnam. Voluptatibus deserunt dolorem odit perferendis quis mollitia in dolorum." />

      </div>
    );
  }
}



export default App;
