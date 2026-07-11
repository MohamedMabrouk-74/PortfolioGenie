import { useMutation } from "@tanstack/react-query";
import { generateAboutMe } from "../api/aiApi";

export function useGenerateAboutMe() {
  return useMutation({
    mutationFn: generateAboutMe,
  });
}
