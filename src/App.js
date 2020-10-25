import { useQuery } from "react-query";

function App({ fetchRepos }) {
  const { data, isLoading, error } = useQuery("repoData", () => fetchRepos());

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred";

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>{data.subscribers_count}</strong>{" "}
      <strong>{data.stargazers_count}</strong>{" "}
      <strong>{data.forks_count}</strong>
    </div>
  );
}

export default App;