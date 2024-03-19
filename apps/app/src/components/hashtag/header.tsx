import { View, Text } from 'react-native'
import React from 'react'
import { api } from '~/utils/api'
import { Image } from 'expo-image'
import { Button } from '../commons/button'

type TagReturnType = NonNullable<ReturnType<ReturnType<typeof api.useUtils>['hashTag']['byId']['getData']>>

type StockDetailsProps = TagReturnType['stock']

export const StockDetails = (stock: StockDetailsProps) => {
  const isUp = parseFloat(stock?.priceInfo.pChange.toFixed(2)!) < 0 ? true : false
  return (
    <>
      <View className='flex-1 items-center w-full  flex-row gap-x-5 px-10 py-5 '>
        <Image source={{ uri: `https://api.dicebear.com/8.x/identicon/svg?seed=${stock?.info.companyName}` }} className='w-20 h-20 rounded-full' />
        <View className='flex flex-col gap-y-1'>
          <Text className='text-white font-bold text-xl'>{stock?.info.companyName}</Text>
          <Text className='text-white font-normal text-base'>{stock?.info.symbol}</Text>
          <Text className={`${isUp ? 'text-red-500' : 'text-green-500'}`}>₹{stock?.priceInfo.lastPrice}</Text>
          <Text className={`${isUp ? 'text-red-500' : 'text-green-500'}`}>{stock?.priceInfo.pChange.toFixed(2)}%</Text>
        </View>
      </View>
      <Button variants='fill' className='h-12'>
        <Text className='font-black text-base uppercase text-black'>Follow</Text>
      </Button>
    </>
  )
}


type HashtagDetailsProps = Omit<TagReturnType, 'stock' | "isStock">

export const HashtagDetails = ({ name, id }: HashtagDetailsProps) => {
  return (
    <View className='flex-1 items-center w-full  flex-row gap-x-5 px-10 py-5 '>
      <Image source={{ uri: `https://api.dicebear.com/8.x/identicon/svg?seed=${name}` }} className='w-20 h-20 rounded-full' />
      <View className='flex flex-col gap-y-3 w-full'>
        <Text className='text-white font-bold text-xl'>#{name}</Text>
        <Button variants='fill' className='h-10 w-2/4'>
          <Text className='font-bold text-sm uppercase text-black'>Follow</Text>
        </Button>

      </View>
    </View>
  )
}
