import UserOverview from "@/components/layout/UserLayout/UserOverview";
import Withdrawmoney from "@/components/layout/UserLayout/Withdrawmoney";
import type { ISidebarItem } from "@/types";

 export const userSidebarItem:ISidebarItem[] = [
    {
      title: "User Dashboard",
      url: "#",
      items: [
        {
          title: "Home",
          url: "",
          component:UserOverview
        },
        {
          title: "Send Money",
          url: "sendmoney",
          component:Withdrawmoney
        },
        {
          title: "Withdrawl",
          url: "withdraw",
          component:Withdrawmoney
        },
        {
          title: "Transaction history",
          url: "usertransaction",
          component:Withdrawmoney
        },
        {
          title: "Profile management ",
          url: "userprofile",
          component:Withdrawmoney
        },
        
      ],
    },
    
  ]