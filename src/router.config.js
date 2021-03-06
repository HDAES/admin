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
import Uploads from "./pages/features/uploads";
import Echarts from "./pages/chart/echarts";
import G2 from "./pages/chart/g2";
import Quill from './pages/edit/quill'
import BraftEditor from './pages/edit/braftEditor'
import Emoji from './pages/icon/emoji'
import BlogSort from './pages/blog/sort'
import BlogTags from './pages/blog/tags'
import BlogDetails from './pages/blog/details'
import BlogMusic from './pages/blog/music'
import BlogSaying from './pages/blog/saying'
import BlogLink from './pages/blog/link'

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
        {path:'/auth/menus', name:'menus',component:Menus,auth:false},
        {path:'/features/uploads', name:'uploads',component:Uploads,auth:false},
        {path:'/chart/echarts', name:'echarts',component:Echarts,auth:false},
        {path:'/chart/g2', name:'G2',component:G2,auth:false},
        {path:'/edit/quill', name:'quill',component:Quill,auth:false},
        {path:'/edit/braft',name:'braftEditor',component:BraftEditor,auth:false},
        {path:'/ui/emoji',name:'Emoji',component:Emoji,auth:false},
        {path:'/blog/sort',name:'BlogSort',component:BlogSort,auth:false},
        {path:'/blog/tags',name:'BlogTags',component:BlogTags,auth:false},
        {path:'/blog/details',name:'BlogDetails',component:BlogDetails,auth:false},
        {path:'/blog/music',name:'BlogMusic',component:BlogMusic,auth:false},
        {path:'/blog/saying',name:'BlogSaying',component:BlogSaying,auth:false},
        {path:'/blog/link',name:'BlogLink',component:BlogLink,auth:false},
        
    ]},
]

export default Routes