import { userSidebarItem } from './../routes/userSIdebarItem';
import { role } from "@/constants/role";
import { adminSidebarItem } from '@/routes/adminSideberitem';
import { agentSidebar } from '@/routes/agentSidebar';
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {

    switch (userRole) {
        case role.superAdmin:
            console.log("userRole :", userRole);

            return [...adminSidebarItem]

        case role.admin:
            return [...adminSidebarItem]
        case role.user:
            return [...userSidebarItem]
            case role.agent:
                return[...agentSidebar]
        default:
            return [];
    }
}