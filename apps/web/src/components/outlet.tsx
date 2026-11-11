import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div>
      <AppHeader />
      <AppSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;