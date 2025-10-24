import Usermanage from "@/components/layout/AdminLayout/Usermanage";
import type { ISidebarItem } from "@/types";

 export const agentSidebar:ISidebarItem[] = [
    {
      title: "Agent Dashboard",
      url: "#",
      items: [
       
        {
          title: "Add money",
          url: "agent/add-money",
          component:Usermanage

        },
      ],
    },
    
  ]