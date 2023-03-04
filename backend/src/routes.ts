import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitSchema = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    })

    const today = dayjs().startOf('day').toDate()

    const { title, weekDays } = createHabitSchema.parse(request.body)

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            }
          }),
        },
      },
    })
  })

  app.get('/day', async (request) => {
    const getDayParamsSchema = z.object({
      date: z.coerce.date(),
    })
    const { date } = getDayParamsSchema.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = dayjs(date).get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    })

    const completedHabits = day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id
    })

    return {
      possibleHabits,
      completedHabits,
    }
  })

  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleHabitParamsSchema.parse(request.params)

    // pega o dia atual
    const today = dayjs().startOf('day').toDate()

    // pega o habito
    const habit = await prisma.habit.findUnique({
      where: {
        id,
      },
    })

    // se o habito não existir, lança um erro
    if (!habit) {
      throw new Error('Habit not found')
    }

    // pega o dia
    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    })

    // se o dia não existir, cria
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    })

    if (dayHabit) {
      // descompleta o habito nesse dia
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      })
      return {
        message: 'Habit checked as undo',
      }
    } else {
      // completar o habito nesse dia
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      })
      return {
        message: 'Habit checked as done',
      }
    }
  })
}
