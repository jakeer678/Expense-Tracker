import { render, screen } from "@testing-library/react";
import Login from "./Login";
import userEvent from "@testing-library/user-event";

describe("Login component", () => {
  test("render heder Login", () => {
    //Arrange
    render(<Login />);
    //Act---

    //Assert--
    const loginCompoent = screen.getByText("Login");
    expect(loginCompoent).toBeInTheDocument();
  });

  test("renders if the login button is not clicked", () => {
    //Arrange
    render(<Login />);
    //Act

    //Assert
    const outPutElement = screen.getByText("login", { exact: false });
    expect(outPutElement).toBeInTheDocument();
  });

  test("If he login button is clicked", () => {
    //Arrange
    render(<Login />);

    //Act
    const buttonElemnt = screen.getByRole("button");
    userEvent.click(buttonElemnt);

    //Assert
    const outPutElementBtn = screen.getByText("sending request");
    expect(outPutElementBtn).toBeInTheDocument();
  });
});
