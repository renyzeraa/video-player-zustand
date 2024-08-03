import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../store";
import { next } from "../store/slices/player";
import { Loader } from "lucide-react";

export function Video() {
  const dispatch = useAppDispatch()

  const { lesson, isLoading } = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex, isLoading } = state.player
    return {
      lesson: state.player.course?.modules[currentModuleIndex].lessons[currentLessonIndex],
      isLoading: isLoading
    }
  })

  function handleNextVideo() {
    dispatch(next())
  }

  return (
    <div className='w-full bg-zinc-950 aspect-video'>
      {isLoading || !lesson ?
        (
          <div className="flex h-full items-center justify-center">
            <Loader size={30} className="animate-spin text-zinc-400" />
          </div>
        )
        :
        (
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            playing
            onEnded={handleNextVideo}
            url={`https://www.youtube.com/watch?v=${lesson.id}`}
          />
        )}

    </div>
  )
}