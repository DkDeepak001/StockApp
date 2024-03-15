import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome6, SimpleLineIcons } from '@expo/vector-icons'
import Pagination from '../onboarding/pagiantion'

type PostActionProps = {
  activeSlide: number
  postLength: number
}

const PostAction = ({ activeSlide, postLength }: PostActionProps) => {
  return (
    <View className='w-full flex flex-row items-center justify-between  p-4 '>
      <View className='flex flex-row gap-x-5 items-center w-1/4 justify-evenly'>
        <Pressable>
          <SimpleLineIcons name="like" size={24} color="white" />
        </Pressable>
        <Pressable>
          <SimpleLineIcons name="dislike" size={24} color="white" />
        </Pressable>
      </View>

      {postLength !== 1 &&
        <View className='w-2/4'>
          <Pagination dots={postLength} active={activeSlide} />
        </View>}
      <Pressable className='w-1/4 items-center flex flex-row justify-end'>
        <FontAwesome6 name="comment-dots" size={24} color="white" />
      </Pressable>

    </View>
  )
}

export default PostAction
