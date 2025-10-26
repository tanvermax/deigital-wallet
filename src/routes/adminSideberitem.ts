import AdminOverview from "@/components/layout/AdminLayout/AdminOverview";
import AdminProfile from "@/components/layout/AdminLayout/AdminProfile";
import ManageAgents from "@/components/layout/AdminLayout/ManageAgents";
import ManageUsers from "@/components/layout/AdminLayout/ManageUsers";
import type { ISidebarItem } from "@/types";

export const adminSidebarItem: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    url: "#",
    items: [
       {
        title: "Home",
        url: "",
        component: AdminOverview
      },
      {
        title: "Manage users",
        url: "alluser",
        component: ManageUsers

      },
      {
        title: "Manage agents",
        url: "allagents",
        component: ManageAgents

      },
      {
        title: "View all transactions",
        url: "transactions",
        component: ManageUsers

      },
      {
        title: "Profile management",
        url: "adminprofile",
        component: AdminProfile,

      },
    ],
  },

]


