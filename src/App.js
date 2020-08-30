import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect} from 'react-router-dom'
import Auth from './containers/Auth/Auth';
import Filter from './containers/Filter/Filter';

export const authorizedContext = React.createContext(false)
export const tokenContext = React.createContext('')

class App extends Component {

  state = {
    token: '',
    authorized: false
  }

  render() {
    return (
      <Layout>
        <Switch>
          {this.state.authorized ? 
            <Route path='/filter' component={Filter}></Route> :
            
            <tokenContext.Provider value={this.state.token}>
              <authorizedContext.Provider value={this.state.authorized}>
                <Route path='/' component={Auth}></Route>
              </authorizedContext.Provider>
            </tokenContext.Provider>
          }
          <Redirect to={'/'}/>
        </Switch>
      </Layout>
    ) 
  }
}

export default App;
