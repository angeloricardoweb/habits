import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Plus, X } from 'phosphor-react';
import ImageLogo from '../assets/logo.svg';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-3xl flex items-center justify-between">
      <img src={ImageLogo} alt="Habits" />
      <button
        type="button"
        className="border border-violet-500 flex items-center gap-3 hover:scale-105 transition-all active:scale-110"
        onClick={() => setOpen(true)}
      >
        <Plus size={20} className="text-violet-500" />
        Novo Hábito
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/80 absolute inset-0 w-full h-full" />
          <Dialog.Content className="p-10 absolute bg-zinc-400 rounded-xl right-1/2 top-1/2 w-full max-w-xl translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute right-6 top-6 hover:text-zinc-200 text-zinc-500 border-none">
              <X />
            </Dialog.Close>
            <h2 className="text-white">Modal</h2>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
