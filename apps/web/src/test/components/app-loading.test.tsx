import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import AppLoading from "@/components/app-loading";

describe("AppLoading", () => {
  it("renders", () => {
    render(<AppLoading />);

    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
  });
});