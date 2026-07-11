import { useQuery } from "@tanstack/react-query";
import { fetchGithubRepos } from "../api/githubApi";

export function useGithubRepos(username) {
  return useQuery({
    queryKey: ["githubRepos", username],
    queryFn: () => fetchGithubRepos(username),
    enabled: Boolean(username),
    staleTime: 5 * 60 * 1000,
  });
}
