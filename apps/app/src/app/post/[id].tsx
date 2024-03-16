import { View, ScrollView, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { api } from '~/utils/api';
import Loader from '~/components/commons/loader';
import Post from '~/components/commons/post';
import { Image } from 'expo-image';
import { useUser } from '@clerk/clerk-expo';
import { BasicInput } from '~/components/commons/textInput';
import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import Comment from '~/components/post/comment';
import { ReturnUserType } from '@stockHub/api/src/router/post';

const PostWithComment = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser()

  const context = api.useUtils()
  const [comment, setComment] = useState<string>("")

  const { data: post, isLoading } = api.post.byId.useQuery({ id: id as string }, {
    enabled: !!id
  })

  const { mutateAsync: addComment, isLoading: isUploading } = api.comment.add.useMutation({
    onMutate: (variable) => {
      context.comment.all.cancel()

      //@ts-ignore
      context.comment.all.setData({ id: id as string }, (prev) => {
        if (!prev) return prev
        return [{
          id: "tempId",
          comment: variable.comment,
          fromNow: "a few second ago",
          author: user,
          userId: user?.id,
          postId: id as string,
          createdAt: ''
        },
        ...prev
        ]

      })
    }
  })
  const { data: comments } = api.comment.all.useQuery({ id: id as string })

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
  if (!post) {
    return
  }

  return (
    <View className='flex flex-1'>
      <ScrollView className='flex flex-1 mb-20'>
        <Post {...post} />
        <FlashList
          data={comments}
          renderItem={({ item }) => <Comment {...item} />}
        />
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
