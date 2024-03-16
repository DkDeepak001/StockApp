import { View, Text } from 'react-native'
import React from 'react'
import { api } from '~/utils/api'
import { ArrayElement } from '../commons/post'
import { Image } from 'expo-image'

type CommentProps = NonNullable<ArrayElement<Exclude<ReturnType<ReturnType<typeof api.useUtils>['comment']['all']['getData']>, undefined>>>


const Comment = ({ comment, author, fromNow }: CommentProps) => {
  return (
    <View className='flex flex-row gap-x-3 p-5 pb-3  '>
      <Image source={{ uri: author?.imageUrl }} className='h-9 w-9 rounded-full' />
      <View className='flex flex-col gap-y-1'>
        <Text className='text-lg font-black text-white'>{author?.username}{" "}<Text className='font-light text-base'>{" "}{fromNow}</Text>
        </Text>
        <Text className='text-white text-lg font-2xl'>{comment}</Text>
      </View>
    </View>
  )
}

export default Comment
