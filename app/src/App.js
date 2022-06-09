import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Help from './pages/Help';
import Buy from './pages/Buy';
import AR from './components/AR';
import MintNFT from './components/MintNFT';
import SendSol from './components/SendSol';

function App() {
  return (
    
    <BrowserRouter>
    <NavBar/>
      <Switch>
      <Route component={Home} path='/' exact/>
      <Route component={Upload} path='/upload'/>
      <Route component={Help} path='/help'/>
      <Route component={Buy} path='/buy'/>
      <Route component={AR} path='/ar'/>
      <Route component={MintNFT} path='/mintnft'/>
      <Route component={SendSol} path='/sendsol'/>
      {/* <Route component={Error} path='*'/> */}
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
