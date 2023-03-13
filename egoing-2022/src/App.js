import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  return (
    <header>
      <h1><a href="/" onClick={(e) => {
        e.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props){
  const lis = [];
  for(let i = 0 ; i < props.topics.length; i++){
    let t = props.topics[i];
    lis.push(
    <li key={t.id}>
      <a id={t.id} href={"/read/" + t.id} onClick={e => {
        e.preventDefault();
        // props.onChangeMode(e.target.id);
        props.onChangeMode(Number(e.target.id));
      }}>{t.title}</a>
    </li>);
  }
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}   

function Article(props){
  return (
  <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
  )
}

function App() {

  // const mode = "READ";
  // const _mode = useState("WELCOME");
  // const mode = _mode[0];
  // console.log("_mode : ", _mode);

  const _topics = new Array();
  _topics.push({id:1, title: "html", body: "html is ..."});
  _topics.push({id:2, title: "css", body: "css is ..."});
  _topics.push({id:3, title: "javascript", body: "javascript is ..."});

  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState(_topics);
  const [nextId, setNextId] = useState(4);



  let content = null;
  let contextControl = null;

  if(mode === "WELCOME"){
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  }else if(mode === "READ"){

    let title = null;
    let body = null;

    for(let i = 0 ; i < topics.length ; i++){
      if(topics[i].id == id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Article title={title} body={body}></Article>;
    contextControl = <>
    <li>
      <a href={"/update/" + id} onClick={(e) => {
      e.preventDefault();
      setMode("UPDATE");
    }}>UPDATE</a>
    </li>
    <li><input type="button" value="Delete" onClick={() => {
      const newTopics = [];
      for(let i = 0; i < topics.length ; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode("WELCOME");
    }}></input></li>
    </>

  }else if(mode === "CREATE"){

    content = <Create onCreate={(_title, _body) => {
      const newTopics = [...topics];
      newTopics.push({id:nextId, title:_title, body:_body});
      setId(nextId);
      setNextId(nextId + 1);
      setTopics(newTopics);
      setMode('READ');
    }}></Create>
  }else if(mode === "UPDATE"){

    let title = null;
    let body = null;

    for(let i = 0 ; i < topics.length ; i++){
      if(topics[i].id == id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      const updatedTopic = {id:id, title:_title, body:_body};
      const newTopics = [...topics];
      for(let i = 0; i < newTopics.length ; i++){
        if(newTopics[i].id == id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode("READ");
    }}></Update>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={()=>{
        // alert('React Click Event Header!!!');
        setMode("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        // alert(id);
        setMode("READ");
        setId(id);
        }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={(e) => {
            e.preventDefault();
            setMode("CREATE");
          }}>CREATE</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

function Create(props){
  return (
  <article>
    <h2>CREATE</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>      
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article> 
  )
}

function Update(props){

  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>UPDATE</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        props.onUpdate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={(e) => {
          // console.log(e.target.value);
          setTitle(e.target.value);
        }}/></p>      
        <p><textarea name="body" placeholder="body"  value={body} onChange={(e) => {
          // console.log(e.target.value);
          setBody(e.target.value);
        }}></textarea></p>
        <p><input type="submit" value="Update"></input></p>
      </form>
  </article>     
  );
}

export default App;
