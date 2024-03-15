import { View, Text } from 'react-native'
import React from 'react'
import { PostProps } from '../commons/post'
import { Image } from 'expo-image'

type PostUserDetailsProps = Pick<PostProps, "author" | "fromNow">

const PostUserDetails = ({ fromNow, author }: PostUserDetailsProps) => {
  return (
    <View className='w-full flex flex-row  gap-x-2 items-center px-4 py-4'>
      <Image source={{ uri: author?.imageUrl }} className='h-12 w-12 rounded-full' />
      <View className='flex flex-col gap-y-0'>
        <Text className='font-extrabold text-xl text-white'>{author?.username}</Text>
        <Text className='font-normal text-sm text-white'>{fromNow}</Text>
      </View>
    </View>
  )
}

export default PostUserDetails
