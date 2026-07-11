import { useQuery } from "@tanstack/react-query";
import { fetchGithubProfile } from "../api/githubApi";

export function useGithubProfile(username) {
  return useQuery({
    queryKey: ["githubProfile", username],
    queryFn: () => fetchGithubProfile(username),
    enabled: Boolean(username),
    staleTime: 5 * 60 * 1000,
  });
}
