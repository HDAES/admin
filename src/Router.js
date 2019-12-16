import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Admin from './Admin'
import login from './pages/login';
import Index from './pages/index'
import Form from './pages/ui/Form'
export default () => <Router>
    <App>
        <Switch>
            <Route path="/login" component={login} />
            <Route path="/" render={ () => (
                <Admin>
                    <Switch>
                        <Route path="/index" component={Index} />
                        <Route path="/form" component={Form} />
                    </Switch>
                </Admin>
            )} />
        </Switch>
    </App>
</Router>





function App({children}) {
    return <div style={{height:'100%'}}>{children}</div>
}
