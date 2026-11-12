import { Outlet } from "react-router";
import { SiteHeader } from "./site-header";

function FileBrowserLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default FileBrowserLayout;