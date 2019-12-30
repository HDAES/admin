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
import role from "./pages/auth/role";
import Menus from "./pages/auth/Menus";
const Routes = [
    {path:'/',name: 'adminLayout', component: Admin, auth: true, routes: [
        {path:'/index', name: 'index', component:Index, auth:false},
        {path:'/ui/icons', name: 'icon', component:Icons, auth:false},
        {path:'/ui/button', name: 'button', component:Button, auth:false},
        {path:'/ui/modals', name: 'modals', component:Modals, auth:false},
        {path:'/ui/loading', name: 'loading', component:Loading, auth:false},
        {path:'/ui/notification', name: 'notification', component:Note, auth:false},
        {path:'/ui/tabs', name: 'tabs', component:Tabs, auth:false},
        {path:'/ui/gallery', name: 'gallery', component:Gallery, auth:false},
        {path:'/ui/form', name: 'form', component:Form, auth:false},
        {path:'/auth/role', name: 'role', component:role, auth:false},
        {path:'/auth/menus', name:'menus',component:Menus,auth:false}
    ]},
]

export default Routes