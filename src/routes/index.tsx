import App from "@/App";
import DeluxeError from "@/components/ErrorLayout/Error";
import Addmoney from "@/components/layout/AgentLayout/AddMoneyInterface/Addmoney";
import AgentOverview from "@/components/layout/AgentLayout/AddMoneyInterface/AgentOverview";
import DasbordLayout from "@/components/layout/Dashbord/DashbordLaayout";
import Home from "@/components/layout/Home/Home";
import UserOverview from "@/components/layout/UserLayout/UserOverview";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import About from "@/pages/About";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Home,
                path: "/",
            },
            {
                Component: About,
                path: "about",
            },
        ],
        errorElement: <DeluxeError />,
    },
    {
        Component: DasbordLayout,
        path: "dashbord/user",
        children: [
            {
                Component: Addmoney,
                path: "add-money"
            }
            ,
            {
                Component: UserOverview,
                path: ""
            }
        ],

    },
    {
        Component: DasbordLayout,
        path: "dashbord/agent",
        children: [
            {
                Component: AgentOverview,
                path: ""
            }
        ]
    },

    {
        Component: Login,
        path: "login"
    },
    {
        Component: Register,
        path: "sigin"
    }
])