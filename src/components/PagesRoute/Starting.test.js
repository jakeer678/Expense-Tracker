import { render, screen } from "@testing-library/react";

import StartingPage from "./StartingPage";

describe("starting page component", () => {
  test("render staring page", () => {
    //Arrange
    render(<StartingPage />);
    //Act---

    //Assert--
    const loginCompoent = screen.getByText("Welcome to Expense Tracker");
    expect(loginCompoent).toBeInTheDocument();
  });
});
