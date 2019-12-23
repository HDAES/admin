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
const Routes = [
    {path:'/login', name: 'login', component: Login, auth: false },
    {path:'/',name: 'adminLayout', component: Admin, auth: false, routes: [
        {path:'/index', name: 'index', component:Index, auth:false},
        {path:'/ui/icon', name: 'icon', component:Icons, auth:false},
        {path:'/ui/button', name: 'button', component:Button, auth:false},
        {path:'/ui/modals', name: 'modals', component:Modals, auth:false},
        {path:'/ui/loading', name: 'loading', component:Loading, auth:false},
        {path:'/ui/notification', name: 'notification', component:Note, auth:false},
        {path:'/ui/tabs', name: 'tabs', component:Tabs, auth:false},
        {path:'/ui/gallery', name: 'gallery', component:Gallery, auth:false},
        {path:'/ui/form', name: 'form', component:Form, auth:false},
    ]},
]

export default Routes