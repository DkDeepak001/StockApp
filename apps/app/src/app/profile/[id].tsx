import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { api } from '~/utils/api'
import Loader from '~/components/commons/loader'
import { Image } from 'expo-image'
import { Button } from '~/components/commons/button'

const Profile = () => {
  const { id } = useLocalSearchParams()
  const { data: user, isLoading } = api.user.byId.useQuery({ id: id as string })
  const { data: stock } = api.stock.bySymbol.useQuery({ symbol: "" })
  if (isLoading) {
    return (
      <Loader>
        <Text className='text-white font-bold'> Loading Profile.. </Text>
      </Loader>)
  }
  return (
    <ScrollView contentContainerStyle={{
      alignItems: "center"
    }} className='flex-1'
    >
      <View className='flex gap-y-5 items-center  w-10/12'>
        <Image source={{ uri: user?.imageUrl }} className='w-28 h-28 rounded-full' />
        <View className='flex items-center'>
          <Text className='text-white font-bold text-xl'>@{user?.username}</Text>
          <Text className='text-gray-300 font-semibold text-lg'>{user?.firstName} {user?.lastName}</Text>
        </View>
        <Button variants='fill'><Text className='font-bold text-lg'>Follow</Text></Button>
      </View>
    </ScrollView>
  )
}

export default Profile 
