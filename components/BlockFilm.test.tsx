import { fireEvent, render, screen } from "@testing-library/react";
import BlockFilm from "./BlockFilm";

describe("tests for block film", () => {
  const mockFilm = {
    adult: false,
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    genre_ids: [18, 80],
    id: 278,
    original_language: "en",
    original_title: "The Shawshank Redemption",
    overview:
      "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    popularity: 64.924,
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    release_date: "1994-09-23",
    title: "The Shawshank Redemption",
    video: false,
    vote_average: 8.7,
    vote_count: 21437,
  };
  beforeEach(() => {
    render(<BlockFilm dataFilm={mockFilm} />);
  });
  it("check layout block film", () => {
    const blockFilm = screen.getByTestId("blockFilm");
    expect(blockFilm).toMatchSnapshot();
  });
  it("correct link", () => {
    const link: HTMLLinkElement = screen.getByTestId("linkBlockFilm");
    expect(/themoviedb.org/.test(link.href)).toEqual(true);
  });
  it("event on star", () => {
    const star = screen.getByTestId("star");
    expect(star.onclick).not.toBeUndefined();
  });
  it("add value in localStorage on click of star", () => {
    const star = screen.getByTestId("star");
    fireEvent.click(star);
    expect(window.localStorage.getItem("markedFilms")).not.toBeNull();
  });
});
