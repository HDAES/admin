import React from 'react';
import { HashRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import routes from './router.config'


export default () => <Router>
    <App>
        <Switch>
            {
               RouteWithSubRoutes(routes)
              
            }



            {/* <Route path="/login" component={login} />
            <Route path="/" render={ () => (
                <Admin>
                    <Switch>
                        <Route path="/index" component={Index} />
                        <Route path="/form" component={Form} />
                    </Switch>
                </Admin>
            )} /> */}
        </Switch>
    </App>
</Router>





function App({children}) {
    return <div style={{height:'100%'}}>{children}</div>
}


function RouteWithSubRoutes (routesMap){
    return routesMap.map( (item, index) =>{
        if(item.routes){
            return <Route path={item.path} key={index} render={ ()=>
                <item.component>
                    { RouteWithSubRoutes(item.routes)} 
                </item.component>
            }/>
        }else{
            return item.auth ?  <Route path={item.path}  render={ () => <Redirect to="/login"/>} key={index}/>
            :<Route  {...item} key={index}/>
        }
    })
}

