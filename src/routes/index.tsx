import App from "@/App";
import DeluxeError from "@/components/ErrorLayout/Error";
import Features from "@/components/feature/Feature";
import AdminOverview from "@/components/layout/AdminLayout/AdminOverview";
import AdminProfile from "@/components/layout/AdminLayout/AdminProfile";
import ManageAgents from "@/components/layout/AdminLayout/ManageAgents";
import ManageTransactions from "@/components/layout/AdminLayout/ManageTransactions";
import ManageUsers from "@/components/layout/AdminLayout/ManageUsers";
import AgentOverview from "@/components/layout/AgentLayout/AddMoneyInterface/AgentOverview";
import AgentAddMoney from "@/components/layout/AgentLayout/AgentAddMoney";
import AgentCommissionHistory from "@/components/layout/AgentLayout/AgentCommissionHistory";
import AgentTransactions from "@/components/layout/AgentLayout/AgentTransactions";
import AgentWithdraw from "@/components/layout/AgentLayout/AgentWithdraw";
import DasbordLayout from "@/components/layout/Dashbord/DashbordLaayout";
import Home from "@/components/layout/Home/Home";
import SendMoney from "@/components/layout/UserLayout/SendMoney";
import UserOverview from "@/components/layout/UserLayout/UserOverview";
import UserProfile from "@/components/layout/UserLayout/UserProfile";
import UserTransactions from "@/components/layout/UserLayout/UserTransactions";
import Withdrawmoney from "@/components/layout/UserLayout/Withdrawmoney";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import Contact from "@/Contact/Contact";
import FAQ from "@/FAQ/FAQ";
import About from "@/pages/About";
import Pricing from "@/Pricing/Pricing";
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
            }, {
                Component: Features,
                path: "feature"
            },
            {
                Component: Pricing,
                path: "pricing"
            },
            {
                Component: Contact,
                path: "contact"
            },
            {
                Component: FAQ,
                path: "faq"
            }
        ],
        errorElement: <DeluxeError />,
    },
    {
        Component: DasbordLayout,
        path: "dashbord/user",
        children: [
            {
                Component: UserOverview,
                path: ""
            },
            {
                Component:Withdrawmoney,
                path:"withdraw"
            },
            {
                Component:SendMoney,
                path:"sendmoney"
            },
            {
                Component:UserTransactions,
                path:"usertransaction"
            },
            {
                Component:UserProfile,
                path:"userprofile"
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
            },{
                Component:AgentAddMoney,
                path:'add-money'
            },
            {
                Component:AgentTransactions,
                path:"transactions"
            },
            {
                Component:AgentWithdraw,
                path:"withdraw-money"
            },
            {
                Component:AgentCommissionHistory,
                path:"comissionhistory"
            }
        ]
    },
    {
        Component: DasbordLayout,
        path: "dashbord/admin",
        children: [
            {
                Component: AdminOverview,
                path: ""
            },
            {
                Component: ManageUsers,
                path: "alluser"
            },
            {
                Component:ManageAgents,
                path:"allagents"
            },
            {
                Component:ManageTransactions,
                path:"transactions"
            },
            {
                Component:AdminProfile,
                path:"adminprofile"
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