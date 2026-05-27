export function getScrollStage(progress: number) {
  if (progress < 0.2) return "chaos";

  if (progress < 0.45) return "pregnant";

  if (progress < 0.7) return "dissolve";

  return "mother";
}
