import Home from "./index";
import { screen, render, fireEvent } from "@testing-library/react";
import "isomorphic-fetch";

describe("Tests for home page", () => {
  beforeEach(() => {
    render(<Home />);
  });
  it("check layout home page", () => {
    const home = screen.getByTestId("home");
    expect(home).toMatchSnapshot();
  });
  it("check arrows of paginaiton", () => {
    const prevArrow = screen.getByTestId("prevArrow");
    const nextArrow = screen.getByTestId("nextArrow");
    const currentPage = screen.getByTestId("currentPage");
    expect(currentPage.textContent).toEqual("1");
    fireEvent.click(nextArrow);
    expect(currentPage.textContent).toEqual("2");
    fireEvent.click(prevArrow);
    expect(currentPage.textContent).toEqual("1");
  });
});
