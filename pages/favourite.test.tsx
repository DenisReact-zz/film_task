import Favourite from "./favourites";
import { screen, render } from "@testing-library/react";
import "isomorphic-fetch";

describe("Tests for favourite page", () => {
  it("check layout favourite page", () => {
    render(<Favourite />);
    const favourite = screen.getByTestId("favourite");
    expect(favourite).toMatchSnapshot();
  });
});
