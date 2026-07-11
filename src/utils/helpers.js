export function truncateText(text, maxLength = 140) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;
}

export function getLanguageColor(language) {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    HTML: "#e34c26",
    CSS: "#563d7c",
  };
  return colors[language] || "var(--color-text-muted)";
}
