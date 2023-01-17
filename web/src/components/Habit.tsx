import React from 'react'

interface HabitProps {
    completed: boolean
}

export default function Habit(props: HabitProps) {
  return (
    <div className='bg-zinc-500 text-sm'>Habit</div>
  )
}
