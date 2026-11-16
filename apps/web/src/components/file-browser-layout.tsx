import { Outlet } from "react-router";
import { SiteHeader } from "./site-header";

type FileBrowserProps = {
  title: string;
};

function FileBrowserLayout({title}: FileBrowserProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader title={title} />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default FileBrowserLayout;