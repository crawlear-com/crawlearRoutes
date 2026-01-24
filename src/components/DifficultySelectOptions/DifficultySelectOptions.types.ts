type DifficultySelectOptionsProps = {
  id: string,
  className?: string,
  onDifficultyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  value: number
}

export type { DifficultySelectOptionsProps };