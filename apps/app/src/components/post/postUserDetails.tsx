import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { PostProps } from '../commons/post'
import { Image } from 'expo-image'
import { router } from 'expo-router'

type PostUserDetailsProps = Pick<PostProps, "author" | "fromNow">

const PostUserDetails = ({ fromNow, author }: PostUserDetailsProps) => {
  const handleProfileRedirect = () => {
    router.push(`/profile/${author.userId}`)
  }
  return (
    <View className='w-full flex flex-row  gap-x-2 items-center px-4 py-4'>
      <Pressable onPress={handleProfileRedirect}>
        <Image source={{ uri: author?.imgUrl }} className='h-12 w-12 rounded-full' />
      </Pressable>
      <View className='flex flex-col gap-y-0'>
        <Pressable onPress={handleProfileRedirect}>
          <Text className='font-extrabold text-xl text-white'>{author?.userName}</Text>
        </Pressable>
        <Text className='font-normal text-sm text-white'>{fromNow}</Text>
      </View>
    </View>
  )
}

export default PostUserDetails
