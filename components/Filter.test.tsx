import { render, screen } from "@testing-library/react";
import Filter from "./Filter";
describe("Tests for filters", () => {
  const mockFn = jest.fn();
  beforeEach(() => {
    render(<Filter onChangeFilter={mockFn} />);
  });
  it("check layout filters", () => {
    const blockFilters = screen.getByTestId("filters");
    expect(blockFilters).toMatchSnapshot();
  });
  it("check buttons in filters", () => {
    const buttonsFilters = screen.queryAllByTestId("buttonOfFilter");
    expect(buttonsFilters.length).toBeGreaterThan(1);
  });
});
