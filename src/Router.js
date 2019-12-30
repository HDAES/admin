import React from 'react';
import { HashRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import Routes from './router.config'
import { connect } from 'react-redux'
import Login from "./pages/login";
const mapStateToProps = state =>{
  return {
    menus:state.menus
  }
}

export default connect(mapStateToProps)(({menus}) => {
    Routes[0].routes.map( item =>{
        if(menus.indexOf(item.path)>-1){
            item.auth = true
        }
        return true
    })
    if(menus.length===0){
        window.location.href='/#/login'
    }  
    return (
        <Router>
            <App>
                <Switch>
                    <Route path='/login' component={Login}/>
                    {
                        RouteWithSubRoutes(Routes,menus)
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
    )
})





function App({children}) {
    return <div style={{height:'100%'}}>{children}</div>
}


function RouteWithSubRoutes (routesMap,menus){
    return routesMap.map( (item, index) =>{
        if(item.routes){
            return <Route path={item.path} key={index} render={ ()=>{
                if(item.component!=null){
                    return <item.component>
                        { RouteWithSubRoutes(item.routes,menus)} 
                    </item.component>
                }  
            }
               
            }/>
        }else{
            return item.auth?<Route  {...item} key={index}/>
            : <Route path={item.path}  render={ () => <Redirect to="/login"/>} key={index}/>
        }
    })
}

