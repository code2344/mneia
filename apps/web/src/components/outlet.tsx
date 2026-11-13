import { Outlet } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

function AppLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-svh w-full">
        <AppSidebar />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;