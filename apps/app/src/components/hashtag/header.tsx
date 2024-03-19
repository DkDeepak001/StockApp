import { View, Text } from 'react-native'
import React from 'react'
import { api } from '~/utils/api'
import { Image } from 'expo-image'
import { Button } from '../commons/button'

type TagReturnType = NonNullable<ReturnType<ReturnType<typeof api.useUtils>['hashTag']['byId']['getData']>>

type StockDetailsProps = TagReturnType['stock']

type FundementalsType = { id: number, title: string, value: string }

export const StockDetails = (stock: StockDetailsProps) => {
  const isUp = parseFloat(stock?.priceInfo.pChange.toFixed(2)!) < 0 ? true : false
  const fundementals: FundementalsType[] = [{
    id: 1,
    title: `PE`,
    value: `${stock?.metadata.pdSymbolPe}`
  }, {
    id: 2,
    title: 'Sector PE',
    value: `${stock?.metadata.pdSectorPe}`
  }, {
    id: 3,
    title: 'Face value',
    value: `${stock?.securityInfo.faceValue}`,
  }, {
    title: 'Issued Size',
    //@ts-ignore -lib type error
    value: `${stock?.securityInfo.issuedSize}`,
    id: 4

  }]

  return (
    <View className='flex-1 gap-y-6 w-full items-center'>
      <View className='flex-1 items-center w-full  flex-row gap-x-5 px-10 pt-5 '>
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
      <Text className='text-white font-bold text-xl w-10/12 text-start'>Fundementals</Text>
      <View className='flex flex-row gap-y-5  flex-wrap w-10/12 items-center justify-between'>
        {fundementals.map(f =>
          <View className='w-[45%] p-3 bg-zinc-800 rounded-xl  gap-y-1' key={f.id}>
            <Text className='text-white font-extrabold text-xl'>{f.title}</Text>
            <Text className='text-white font-base text-base'>{f.value}</Text>
          </View>
        )}
      </View>
    </View>
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
