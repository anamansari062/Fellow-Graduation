import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import NavBar from './components/Navbar';
import Home from './components/Home';
import Upload from './components/Upload';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Switch>
      <Route component={Home} path='/' exact/>
      <Route component={About} path='/upload'/>
      <Route component={SinglePost} path='/post/:slug'/>
      <Route component={Post} path='/post'/>
      <Route component={Project} path='/project'/>
      <Route component={Error} path='*'/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
