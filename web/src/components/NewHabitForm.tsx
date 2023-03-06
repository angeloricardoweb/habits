import { Check } from 'phosphor-react';
import React from 'react';

export function NewHabitForm() {
  return (
    <>
      <form className="w-full flex flex-col mt-6">
        <label htmlFor="title" className="font-semibold leading-tight">
          Qual seu comprometimento?
        </label>
        <input
          type="text"
          id="title"
          autoFocus
          placeholder="Ex:Exercicios, dormir bem, etc..."
          className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        />
        <label htmlFor="" className="font-semibold leading-tight mt-3">
          Qual a recorrência?
        </label>
        <button
          type="submit"
          className="mt-2 rounded-lg flex items-center p-4 gap-3 font-semibold bg-green-600 justify-center"
        >
          <Check size={20} weight={'bold'} />
          Confirmar
        </button>
      </form>
    </>
  );
}
