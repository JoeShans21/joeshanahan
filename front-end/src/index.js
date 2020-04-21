import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation';
import Home from './components/home';
import Software from './components/software';
import About from './components/about';
import Error from './components/error';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/software" component={Software}/>
             <Route path="/about" component={About}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));