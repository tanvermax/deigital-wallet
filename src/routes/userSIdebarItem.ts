import Withdrawmoney from "@/components/layout/UserLayout/Withdrawmoney";
import type { ISidebarItem } from "@/types";

 export const userSidebarItem:ISidebarItem[] = [
    {
      title: "User Dashboard",
      url: "#",
      items: [
        {
          title: "Send Money",
          url: "/user/sendmoney",
          component:Withdrawmoney
        },
        {
          title: "Withdrawl",
          url: "/user/withdraw",
          component:Withdrawmoney
        },
        
      ],
    },
    
  ]