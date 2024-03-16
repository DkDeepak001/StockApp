import { View, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome6, Foundation, SimpleLineIcons } from '@expo/vector-icons'
import Pagination from '../onboarding/pagiantion'
import { api } from '~/utils/api'
import { ReactPostApiInputType } from '@stockHub/validators'
type PostActionProps = {
  activeSlide: number
  postLength: number
  postId: string
  hasReacted: string | null | undefined
}

const PostAction = ({ activeSlide, postLength, postId, hasReacted }: PostActionProps) => {

  const context = api.useUtils()
  const { mutateAsync: addLike } = api.post.react.useMutation({
    onSuccess: () => {
      context.post.all.invalidate()
    }
  })

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
      <View className='flex flex-row gap-x-2 items-center w-1/4 justify-evenly'>
        <Pressable
          onPress={() => handleReaction({ type: 'like' })}
          className=' p-3 rounded-full '
        >
          <FontAwesome name={hasReacted === "like" ? 'thumbs-up' : 'thumbs-o-up'} size={30} color="white" />
        </Pressable>

        <Pressable
          onPress={() => handleReaction({ type: 'dislikes' })}
          className=' p-3 rounded-full  '
        >
          <FontAwesome name={hasReacted === "dislikes" ? "thumbs-down" : "thumbs-o-down"} size={30} color="white" />
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
