import { cleanup, render, screen } from "@testing-library/react";

import App from "../App";

let response = {
  name: "react-query",
  description:
    "Hooks for fetching, caching and updating asynchronous data in React",
  subscribers_count: "144",
  stargazers_count: "14341",
  forks_count: "552",
};

describe("App tests", () => {
  beforeEach(cleanup);
  describe("When loading succeed", () => {
    let fetchRepos;

    beforeEach(() => {
      const props = {
        fetchRepos: jest.fn(),
      };
      fetchRepos = props.fetchRepos;
      fetchRepos.mockResolvedValue(response);
      render(<App {...props} />);
    });

    it("invoke fetchRepose", () => {
      expect(fetchRepos).toBeCalled();
    });

    it("display record", () => {
      expect(screen.queryByText("react-query")).not.toBeNull();
      expect(
        screen.queryByText(
          "Hooks for fetching, caching and updating asynchronous data in React"
        )
      ).not.toBeNull();
      expect(screen.queryByText("144")).not.toBeNull();
      expect(screen.queryByText("14341")).not.toBeNull();
      expect(screen.queryByText("552")).not.toBeNull();
    });
  });
  describe("When loading failed", () => {
    let fetchRepos;

    beforeEach(() => {
      const props = {
        fetchRepos: jest.fn(),
      };
      fetchRepos = props.fetchRepos;
      fetchRepos.mockRejectedValue(new Error("Async error"));
      return render(<App {...props} />);
    });

    it("invoke fetchRepose", () => {
      expect(fetchRepos).toBeCalledTimes(1);
    });

    it("show error message", async () => {
      const el = await screen.findByText("An error has occurred");
      expect(el).not.toBeNull();
    });
  });
  describe("When loading pending", () => {
    beforeEach(() => {
      const props = {
        fetchRepos: new Promise(() => {}),
      };

      render(<App {...props} />);
    });

    it("show loading", async () => {
      const el = await screen.findByText("Loading...");
      expect(el).not.toBeNull();
    });

    it("not display record", () => {
      expect(screen.queryByText("react-query")).toBeNull();
      expect(
        screen.queryByText(
          "Hooks for fetching, caching and updating asynchronous data in React"
        )
      ).toBeNull();
      expect(screen.queryByText("144")).toBeNull();
      expect(screen.queryByText("14341")).toBeNull();
      expect(screen.queryByText("552")).toBeNull();
    });
  });
});
