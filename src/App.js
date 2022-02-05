import logo from './logo.svg';
import './App.css';
import Nav from './componentes/Nav';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './componentes/Home';
import Details from './componentes/Details';
import Locate from './componentes/Locate';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/details/:id' component={Details} />
          <Route path='/locate/:lon/:lat' component={Locate} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
