import { View, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { api } from '~/utils/api';
import Loader from '~/components/commons/loader';
import Post from '~/components/commons/post';
import { Image } from 'expo-image';
import { useUser } from '@clerk/clerk-expo';
import { BasicInput } from '~/components/commons/textInput';
import { FontAwesome } from '@expo/vector-icons';

const PostWithComment = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser()
  const [comment, setComment] = useState<string>("")
  const { data, isLoading } = api.post.byId.useQuery({ id: id as string }, {
    enabled: !!id
  })

  const { mutateAsync: addComment, isLoading: isUploading } = api.comment.add.useMutation()

  const handleAddComment = async () => {
    console.log("adding comment")
    try {
      await addComment({
        comment,
        postId: id as string
      })
    } catch (e) {
      console.log(e)
    } finally {
      setComment('')
    }
  }

  if (isLoading) {
    return <Loader />
  }
  if (!data) {
    return
  }

  return (
    <View className='flex flex-1'>
      <ScrollView className='flex flex-1 mb-20'>
        <Post {...data} />
      </ScrollView>
      <View className='absolute bg-black h-16 w-full bottom-1 flex flex-row items-center px-5 justify-around'>
        <Image source={{ uri: user?.imageUrl }} className='h-9 w-9 rounded-full' />
        <BasicInput
          className=' h-14 mx-3 w-10/12 p-3'
          multiline={true}
          placeholder='Write a comment'
          placeholderTextColor={'gray'}
          textAlignVertical='top'
          onChangeText={(t) => setComment(t)}
          value={comment}
        />
        <Pressable className=' p-2' onPress={handleAddComment}>
          {!isUploading ?
            <FontAwesome name="send" size={24} color="white" />
            :
            <Loader fullScreen={false} />
          }
        </Pressable>
      </View>
    </View >
  )
}

export default PostWithComment 
