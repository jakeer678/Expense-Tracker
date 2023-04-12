import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";

describe("Expenses Asynch code", () => {
  test("renders exepnses if request succeeds", async () => {
    //Arrange
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => {},
    });

    render(<Expenses />);

    const listExpenses = await screen.findllByRole("expenses");
    expect(listExpenses).not.toHaveLength(0);
  });
});
