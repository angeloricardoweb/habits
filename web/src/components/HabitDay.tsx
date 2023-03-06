import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import ProgressBar from './ProgressBar';
import clsx from 'clsx';

interface HabitProps {
  completed: number;
  amount: number;
}

export default function HabitDay({ amount, completed }: HabitProps) {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 border-2 rounded-lg', {
          'bg-zinc-900 border-2 border-zinc-800': completedPercentage === 0,
          'bg-violet-400 border-violet-300':
            completedPercentage > 0 && completedPercentage < 40,
          'bg-violet-500 border-violet-400':
            completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500':
            completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-700 border-violet-600': completedPercentage >= 80,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl flex flex-col bg-zinc-900">
          <span className="font-semibold text-zinc-400">segunda-feira</span>
          <span className="font-extrabold text-3xl leading-tight mt-1">
            16/1
          </span>
          <ProgressBar progress={completedPercentage} />
          <Popover.Arrow className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
