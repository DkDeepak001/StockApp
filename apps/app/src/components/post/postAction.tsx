import { View, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome6, SimpleLineIcons } from '@expo/vector-icons'
import Pagination from '../onboarding/pagiantion'
import { api } from '~/utils/api'
import { ReactPostApiInputType } from '@stockHub/validators'
type PostActionProps = {
  activeSlide: number
  postLength: number
  postId: string
}

const PostAction = ({ activeSlide, postLength, postId }: PostActionProps) => {

  const { mutateAsync: addLike } = api.post.react.useMutation()

  const handleReaction = async (type: Pick<ReactPostApiInputType, "type">) => {
    try {
      await addLike({
        postId,
        type: type.type
      })
    } catch (error) {
      console.log(error)

    }
  }
  return (
    <View className='w-full flex flex-row items-center justify-between  px-4 '>
      <View className='flex flex-row gap-x-5 items-center w-1/4 justify-evenly'>
        <Pressable
          onPress={() => handleReaction({ type: 'like' })}
          className='bg-black p-4 rounded-full'
        >
          <SimpleLineIcons name="like" size={24} color="white" />
        </Pressable>

        <Pressable
          onPress={() => handleReaction({ type: 'dislikes' })}
          className='bg-black p-4 rounded-full'
        >
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
