import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Service from "@/pages/Service";
import CreateItem from "@/pages/CreateItem";
import MyItem from "@/pages/MyItem";
import PersonalCenter from "@/pages/PersonalCenter";
import ItemProgress from "@/pages/ItemProgress";
export default [
    {
        path:"/home",
        component:Home,
        meta:{
            showNav:true
        }
    },
    {
        path:"/login",
        component:Login,
        meta:{
            showNav:false,
        }
    },
    {
        path:"/register",
        component:Register,
        meta:{
            showNav: false,
        }
    },
    {
        path:"/service",
        component:Service,
        meta:{
            showNav: true
        }
    },
    {
        path:"/createItem",
        component:CreateItem,
        meta:{
            showNav: true
        }
    },
    {
        path:"/itemProgress/:itemId",
        component:ItemProgress,
        meta:{
            showNav: true
        }
    },
    {
        path:"/myItem",
        component:MyItem,
        meta:{
            showNav: true
        }
    },
    {
        path: "/personalCenter",
        component: PersonalCenter,
        meta:{
            showNav: true
        }
    },
    {
        path:"*",
        redirect:"/home"
    }
]
