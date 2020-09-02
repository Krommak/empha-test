import React, {useContext} from 'react';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect} from 'react-router-dom'
import {authorizedContext} from './authorized/authorized'
import FormWrap from './authorized/formWrap';
import FilterWrap from './containers/Filter/filterWrap/filterWrap';


const App = (props) => {
  const authorized = useContext(authorizedContext)

    return (
      <Layout>
        <Switch>
          <Route path={'/filter'} component={FilterWrap}></Route>
          {
            authorized ?
            <Redirect to={'/filter'}/>:
            <Route path={'/'} component={FormWrap} ></Route>
          }
          <Route path={'/'} component={FormWrap} ></Route>
        </Switch>
      </Layout>
    ) 
  }


export default App;
