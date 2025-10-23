import App from "@/App";
import DeluxeError from "@/components/ErrorLayout/Error";
import Home from "@/components/layout/Home/Home";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import About from "@/pages/About";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children:[
            {
                Component:Home,
                path:"/",
            },
            {
                Component:About,
                path:"about",
            },
        ],
        errorElement:<DeluxeError/>,
    },
    {
        Component:Login,
        path:"login"
    },
    {
        Component:Register,
        path:"sigin"
    }
])