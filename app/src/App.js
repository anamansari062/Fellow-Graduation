
import './App.css';
import {BrowserRouter, Route, Switch, Router} from "react-router-dom"
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Upload from './components/Upload';
import Help from './pages/Help';
import Buy from './pages/Buy';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Switch>
      <Route component={Home} path='/' exact/>
      <Route component={Upload} path='/upload'/>
      <Route component={Help} path='/help'/>
      <Route component={Buy} path='/buy'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
