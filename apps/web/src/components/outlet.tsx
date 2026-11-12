import { Outlet } from "react-router";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";

function AppLayout() {
  return (
    <SidebarProvider>
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