import React from 'react'
import ImageLogo from '../assets/logo.svg'
import { Plus } from 'phosphor-react'

export default function Header() {
  return (
    <div className="w-full max-w-3xl flex items-center justify-between">
      <img src={ImageLogo} alt="Habits" />
      <button
        type='button'
        className='border border-violet-500 flex items-center gap-3 hover:scale-105 transition-all active:scale-110 '
      >
        <Plus size={20} className="text-violet-500" />
        Novo Hábito</button>
    </div>
  )
}
