import { create } from "zustand";
import { api } from "../lib/axios";

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
  load: () => Promise<void>;
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
        }
        else {
          currentModuleIndex = 0;
        }
        currentLessonIndex = 0;
      }
      set({
        currentLessonIndex,
        currentModuleIndex
      })
    },
    load: async () => {
      set({ isLoading: true })
      const promise = await (new Promise(async (res) => {
        const response = await api.get('/course/1')
        setTimeout(() => {
          res(response.data)
        }, 3000)
      }))
      set({ course: promise as Course, isLoading: false })
    }
  }
})

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentModuleIndex, currentLessonIndex, course } = state
    const currentModule = course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]
    return { currentModule, currentLesson }
  })
}