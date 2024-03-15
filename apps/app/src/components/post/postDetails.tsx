import { View, Text } from 'react-native'
import React from 'react'
import { PostProps } from '../commons/post'

type PostDetailsProps = Pick<PostProps, 'tittle' | "description">

const PostDetails = ({ description, tittle }: PostDetailsProps) => {
  return (
    <View className='flex flex-col gap-y-1 px-4 pb-4'>
      <Text className='font-bold text-xl text-white'>{tittle}</Text>
      <Text className='font-normal text-sm text-white'>{description}</Text>
    </View>
  )
}

export default PostDetails 
