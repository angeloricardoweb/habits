import { FC } from 'react'
import { View, Text } from 'react-native'
import { Header } from '../components/Header'


export const Home: FC = () => {
  return (
    <View className='bg-background flex-1 justify-center items-center px-8 pt-16'>
      <Header />
      <Text className='text-white'>Home</Text>
    </View>
  )
}
