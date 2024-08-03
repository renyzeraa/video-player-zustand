import { MessageCircle } from 'lucide-react'
import { Header } from '../components/header'
import { Video } from '../components/video'
import { Modulo } from '../components/modulo'
import { useEffect } from 'react'
import { useCurrentLesson, useStore } from '../store'

export function Player() {
  const { course, load } = useStore(({ course, load }) => (
    {
      course,
      load,
    }
  ))
  const { currentLesson } = useCurrentLesson()
  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson ? currentLesson.title : 'Nenhum vídeo...'}`
  }, [currentLesson])

  return (
    <div className="bg-zinc-950 text-zinc-50 flex justify-center items-center py-8 h-screen">
      <div className="flex w-[1240px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header
            title={currentLesson ? currentLesson.title : ''}
            description={currentLesson ? `Modulo: ${currentLesson.title}` : ''}
          />
          <button
            className='flex items-center text-sm font-medium text-white gap-2 rounded bg-violet-500 px-3 py-2 hover:bg-violet-600'
          >
            <MessageCircle size={30} />
            Deixar feedback
          </button>
        </div>
        <main className='relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80'>
          <div className='flex-1'>
            <Video />
          </div>
          <aside className='absolute top-0 right-0 divide-y-2 divide-zinc-900 bottom-0 w-80 border-l border-zinc-800 bg-zinc-900 overflow-y-auto scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800'>
            {course?.modules && course.modules.map(({ id, lessons, title }, index) => (
              <Modulo key={id} title={title} lessons={lessons} amountLessons={lessons.length} moduleIndex={index} />
            ))}
          </aside>
        </main>
      </div>
    </div>
  )
}