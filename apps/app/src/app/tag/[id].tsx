import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { api } from '~/utils/api'
import { StockDetails, HashtagDetails } from '~/components/hashtag/header'
const Tags = () => {
  const { id } = useLocalSearchParams()
  const { data: tag } = api.hashTag.byId.useQuery({ id: id as string })
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }} className='flex-1'>
      <View className='flex w-full items-center'>
        {tag?.isStock ? <StockDetails {...tag.stock!} /> : <HashtagDetails {...tag} />}
      </View>

    </ScrollView >
  )
}

export default Tags 
