import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppSidebar }  from "@/components/app-sidebar";

describe("AppSidebar", () => {
  it("renders", () => {
    render(<AppSidebar />);

    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
  });
});