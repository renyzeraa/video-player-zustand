import { useStore } from "../store"

interface HeaderProps {
  title: string
  description: string
}

export function Header({ title, description }: HeaderProps) {
  const isLoading = useStore(store => store.isLoading)

  if (isLoading) {
    return <h2 className="text-2xl font-semibold">Carregando...</h2>
  }

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <span className="text-zinc-300 text-sm">{description}</span>
    </div>
  )
}