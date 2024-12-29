import CardTask from "@/app/component/CardTask";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("CardTask", () => {
  it("muestra la cardTarsk", () => {
    render(<CardTask />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
