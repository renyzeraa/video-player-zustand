import { PlayCircle, Video } from "lucide-react";

interface AssuntoModuloProps {
  name: string
  duration: string // formato HH:MM
  onPlay: () => void
  isCurrent?: boolean
}

export function AssuntoModulo({ name, duration, onPlay, isCurrent = false }: AssuntoModuloProps) {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className='flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-200 transition-colors data-[active=true]:font-semibold disabled:cursor-not-allowed'
    >
      {isCurrent ? <PlayCircle className="size-4 text-emerald-400" /> : <Video className='size-4 text-zinc-500' />}
      <span>{name}</span>
      <span className='ml-auto font-mono text-xs text-zinc-500'>{duration}</span>
    </button>
  )
}