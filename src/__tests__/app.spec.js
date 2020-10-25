import { render, screen } from "@testing-library/react";

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
      expect(screen.getByText("react-query")).not.toBeNull();
      expect(
        screen.getByText(
          "Hooks for fetching, caching and updating asynchronous data in React"
        )
      ).not.toBeNull();
      expect(screen.getByText("144")).not.toBeNull();
      expect(screen.getByText("14341")).not.toBeNull();
      expect(screen.getByText("552")).not.toBeNull();
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
      expect(screen.getByText("An error has occurred")).not.toBeNull();
    });
  });
});
