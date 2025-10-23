import type { ReactNode } from "react";
import Navber from "./Nabver";
import FooterSection from "./Footer";
import { Toaster } from "../ui/sonner";

interface IProps{
    children:ReactNode
}

export default function CommonLayout({ children }:IProps) {
    return (
        <div className="">
           <div className=" container mx-auto">
             <Navber/>
           </div>
           <div className=" min-h-[calc(90vh-250px)] ">
            <Toaster />
             {children}
           </div>
            <FooterSection/>
        </div>
    )
}