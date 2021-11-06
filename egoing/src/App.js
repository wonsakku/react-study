import React, { Component } from 'react';
import TOC from "./components/TOC";
import CreateContent from "./components/CreateContent";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import Subject from "./components/Subject";
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'create',
      selected_count_id: 2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:"Welcome", desc:"Hello, React!"},
      contents:[
        {id:1, title:'HTML', desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, dolorem!'},
        {id:2, title:'CSS', desc:'Lorem ipsum dolor sit amet.'},
        {id:3, title:'JS', desc:'Lorem ipsum dolor, sit amet consectetur adipisicing.'}
      ]
    }
  }

  render(){
    console.log("App.render()");
    var _title, _desc, _article = null;

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if (this.state.mode === 'read'){
      
      var i = 0 ;
      
      while(i < this.state.contents.length){
        
        var data = this.state.contents[i];
        
        if(data.id === this.state.selected_count_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent title={_title} desc={_desc} onSubmit={function(_title, _desc){
        this.max_content_id++;
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc});
        var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          // contents:this.state.contents
          contents : _contents
        });
      }.bind(this)}></CreateContent>
    }

    return (
      <div className="App">
        {/* Hello, React!! */}
        <Subject title={this.state.subject.title} 
                 sub={this.state.subject.sub} 
                 onChangePage={function(id){
                  // alert("hihihi");
                  this.setState({
                    mode:"welcome"
                  });
                }.bind(this)}
                ></Subject>

        <TOC onChangePage={function(id){
              this.setState({
                mode:"read",
                selected_count_id:Number(id)
              });
            }.bind(this)} 
            data={this.state.contents} >
        </TOC>

        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          });
        }.bind(this)}>
        </Control>

        {/* <ReadContent title={_title} desc={_desc}>
        </ReadContent> */}

        {_article}

      </div>
    );
  }
}



export default App;
