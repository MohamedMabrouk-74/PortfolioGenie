import { useMutation } from "@tanstack/react-query";
import { optimizeProjectDescription } from "../api/aiApi";

export function useOptimizeDescription() {
  return useMutation({
    mutationFn: optimizeProjectDescription,
  });
}
