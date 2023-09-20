export function getBarWidth(progress) {
  return progress * 100 + "%";
}

export function getBarColor(progress) {
  switch (true) {
    case progress <= 0.5:
      return "var(--green)";
    case progress <= 0.75:
      return "var(--orange)";
    case progress < 1:
      return "var(--red-50)";
    case progress >= 1:
      return "var(--red)";
  }
}
