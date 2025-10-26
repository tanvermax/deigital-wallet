// import Usermanage from "@/components/layout/AdminLayout/Usermanage";
import AgentOverview from "@/components/layout/AgentLayout/AddMoneyInterface/AgentOverview";
import AgentAddMoney from "@/components/layout/AgentLayout/AgentAddMoney";
import AgentCommissionHistory from "@/components/layout/AgentLayout/AgentCommissionHistory";
// import AgentProfile from "@/components/layout/AgentLayout/AgentProfile";
import AgentTransactions from "@/components/layout/AgentLayout/AgentTransactions";
import Withdrawmoney from "@/components/layout/UserLayout/Withdrawmoney";
import type { ISidebarItem } from "@/types";

export const agentSidebar: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    url: "#",
    items: [
      {
        title: "Home",
        url: "",
        component: AgentOverview

      },

      {
        title: "Add money",
        url: "add-money",
        component: AgentAddMoney

      },
      {
        title: "Withdraw Money",
        url: "withdraw-money",
        component: Withdrawmoney

      },
      {
        title: "View all transactions",
        url: "transactions",
        component: AgentTransactions

      },
      {
        title: "Commission history",
        url: "comissionhistory",
        component: AgentCommissionHistory

      },
      // {
      //   title: "Profile management",
      //   url: "agentprofile",
      //   component: AgentProfile

      // },
    ],
  },

]