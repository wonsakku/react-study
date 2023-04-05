import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';
import Toast from './components/Toast';
import useToast from './hooks/toast';


function App() {

  const [toasts, addToast, deleteToast] = useToast();


  return (

    <Router>
      <NavBar />
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Switch>
          {routes.map(route => {
            const Component = route.component;
            return (
              <Route
                key={route.path}
                exact
                path={route.path} >
                <Component addToast={addToast} />
              </Route>
            )
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
