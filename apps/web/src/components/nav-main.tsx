import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { PlayCircleIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

type NavItem = {
  title: string;
  url: string;
  icon?: React.ComponentType;
  isActive?: boolean;
};

function SidebarNavLink({ item }: { item: NavItem }) {
  return (
    <NavLink to={item.url}>
      {({ isActive }) => (
        <SidebarMenuButton
          isActive={isActive}
          tooltip={item.title}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      )}
    </NavLink>
  );
}

export function NavMain({
  groups,
}: {
  groups: {
    label?: string;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<a href="/study" />}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <PlayCircleIcon />
              <span>Start studying</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
  
        {groups.map((group, index) => (
          <div key={group.label ?? `group-${index}`}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
  
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarNavLink item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
