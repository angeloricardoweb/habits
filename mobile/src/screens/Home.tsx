import { FC } from 'react'
import { View, Text } from 'react-native'
import { DAY_SIZE, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export const Home: FC = () => {
  return (
    <View className='bg-background flex-1 px-8 pt-16'>
      <Header />
      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, index) => {
          return (
            <Text
              className='text-zinc-400 text-xl font-bold text-center mx-1'
              style={{
                width: DAY_SIZE,
                height: DAY_SIZE,
              }}
            >
              {weekDay}
            </Text>
          )
        })}
      </View>
      <HabitDay/>
    </View>
  )
}
