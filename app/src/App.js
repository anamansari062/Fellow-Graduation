import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Upload from './components/Upload';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Switch>
      <Route component={Home} path='/' exact/>
      <Route component={Upload} path='/upload'/>
      {/* <Route component={Error} path='*'/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
