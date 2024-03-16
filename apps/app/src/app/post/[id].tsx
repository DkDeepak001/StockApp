import { View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { api } from '~/utils/api';
import Loader from '~/components/commons/loader';
import Post from '~/components/commons/post';

const PostWithComment = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = api.post.byId.useQuery({ id: id as string }, {
    enabled: !!id
  })
  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return
  }

  return (
    <View>
      <Post {...data} />
    </View>
  )
}

export default PostWithComment 
