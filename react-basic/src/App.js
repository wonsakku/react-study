import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [number, setNumber] = useState(1);

  // let number = 1;
  const double = () => {
    // setNumber(number * 2);
    // setNumber(number * 2);
    setNumber((prv) => prv * 2);
    setNumber((prevState) => prevState * 2);
  };

  return (
    <>
      <div>{number}</div>
      <button className="btn btn-primary" onClick={double}>
        submit
      </button>
    </>
  );
}

export default App;
