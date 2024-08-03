import { create } from "zustand";

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;
  play: (aIndex: [number, number]) => void;
  next: () => void;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,
    play: (aIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = aIndex;
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex
      })
    },
    next: () => {
      let { currentLessonIndex, currentModuleIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex];
      if (nextLesson) {
        currentLessonIndex = nextLessonIndex;
      }
      else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];
        if (nextModule) {
          currentModuleIndex = nextModuleIndex;
          currentLessonIndex = 0;
        }
      }
      set({
        currentLessonIndex,
        currentModuleIndex
      })
    }
  }
})