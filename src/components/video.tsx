import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Video() {
  const { isLoading, next } = useStore(({ next, isLoading }) => ({
    next, isLoading
  }))
  const { currentLesson } = useCurrentLesson()

  return (
    <div className='w-full bg-zinc-950 aspect-video'>
      {isLoading || !currentLesson ?
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
            onEnded={next}
            url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
          />
        )}

    </div>
  )
}