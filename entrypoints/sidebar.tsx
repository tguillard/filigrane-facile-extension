import React, {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {IoMdCloseCircle} from "react-icons/io";
import {IoIosSettings} from "react-icons/io";
import {RiDashboardFill} from "react-icons/ri";

export enum SidebarType {
    'home' = 'home',
    'settings' = 'settings'
}

const Sidebar = (
    {sideNav, closeContent}: {
        sideNav: (sidebarType: SidebarType) => void,
        closeContent?: () => void
    }) => {
    const [sidebarType, setSidebarType] = useState<SidebarType>(SidebarType.home);
    return (null);
};

export default Sidebar;


