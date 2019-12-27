import React from 'react';
import { HashRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import Login from "./pages/login";
import Admin from "./Admin";
import Index from './pages/index'
import Form from './pages/ui/Form'
import Button from "./pages/ui/Button";
import Icons from "./pages/ui/Icons";
import Modals from "./pages/ui/Modals";
import Loading from "./pages/ui/Loading";
import Note from "./pages/ui/Note";
import Tabs from "./pages/ui/Tabs";
import Gallery from "./pages/ui/Gallery";


import { connect } from 'react-redux'

const mapStateToProps = state =>{
  return {
    menus:state.menus
  }
}

export default connect(mapStateToProps)(({menus}) => {
    console.log(menus)
    const Routes = [
        {path:'/login', name: 'login', component: Login, auth: false },
        {path:'/',name: 'adminLayout', component: Admin, auth: false, routes: menus},
    ]
    return (
        <Router>
            <App>
                <Switch>
                    {
                        RouteWithSubRoutes(Routes)
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


function RouteWithSubRoutes (routesMap){
    return routesMap.map( (item, index) =>{
        if(item.routes){
            return <Route path={item.path} key={index} render={ ()=>{
                if(item.component!=null){
                    return <item.component>
                        { RouteWithSubRoutes(item.routes)} 
                    </item.component>
                }  
            }
               
            }/>
        }else{
            return item.auth ?  <Route path={item.path}  render={ () => <Redirect to="/login"/>} key={index}/>
            :<Route  {...item} key={index}/>
        }
    })
}

