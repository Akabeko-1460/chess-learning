const STORAGE_KEY = "chess-tutorial-progress";

function getProgressMap(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgressMap(map: Record<string, string[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function markLessonCompleted(moduleId: string, lessonSlug: string) {
  const map = getProgressMap();
  const completed = map[moduleId] ?? [];
  if (!completed.includes(lessonSlug)) {
    map[moduleId] = [...completed, lessonSlug];
    saveProgressMap(map);
  }
}

export function getCompletedLessons(moduleId: string): string[] {
  return getProgressMap()[moduleId] ?? [];
}
