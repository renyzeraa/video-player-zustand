import { ChevronDown } from "lucide-react";
import { AssuntoModulo } from "./assunto-modulo";
import * as Collapsible from '@radix-ui/react-collapsible';
import { useAppDispatch, useAppSelector } from "../store";
import { play } from "../store/slices/player";

interface ModuloProps {
  title: string
  amountLessons: number
  moduleIndex: number
}

export function Modulo({ amountLessons, title, moduleIndex }: ModuloProps) {
  const { lessons, currentLessonIndex, currentModuleIndex } = useAppSelector((state) => ({
    lessons: state.player.course?.modules[moduleIndex].lessons,
    currentLessonIndex: state.player.currentLessonIndex,
    currentModuleIndex: state.player.currentModuleIndex
  }))

  const dispatch = useAppDispatch()

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger asChild>
        <button className='flex w-full items-center bg-zinc-800 gap-3 p-4'>
          <span className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>
            {++moduleIndex}
          </span>
          <div className='flex flex-col gap-1 text-left'>
            <strong className='text-sm'>{title}</strong>
            <span className='text-xs text-zinc-400'>{amountLessons} aula{amountLessons > 1 && 's'}</span>
          </div>

          <ChevronDown className='size-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform' />
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content asChild>
        <nav className='relative flex flex-col gap-4 p-6'>
          {lessons && lessons.map(({ duration, id, title }, index) => (
            <AssuntoModulo
              key={id}
              onPlay={() => dispatch(play([--moduleIndex, index]))}
              name={title}
              duration={duration}
              isCurrent={currentLessonIndex === index && (currentModuleIndex + 1) === moduleIndex}
            />
          ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>


  )
}