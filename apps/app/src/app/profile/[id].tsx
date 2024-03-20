import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { api } from '~/utils/api'
import Loader from '~/components/commons/loader'
import { Image } from 'expo-image'
import { Button } from '~/components/commons/button'
import { ArrayElement } from '~/components/commons/post'

const Profile = () => {
  const { id } = useLocalSearchParams()
  const { data: user, isLoading } = api.user.byId.useQuery({ id: id as string })
  if (isLoading) {
    return (
      <Loader>
        <Text className='text-white font-bold'> Loading Profile.. </Text>
      </Loader>)
  }

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
        gap: 5
      }}
      columnWrapperStyle={{
        justifyContent: "space-evenly",
        paddingBottom: 10
      }}
      numColumns={2}
      className='w-screen '
      ListHeaderComponent={() => <ProfileHeader {...user!} />}
      data={user?.post}
      renderItem={({ item }) => <ProfilePost {...item} />}
    />
  )
}

type ProfilePostProps = ArrayElement<Exclude<ProfileHeaderProps, undefined>['post']>
const ProfilePost = (post: ProfilePostProps) => {
  return (
    <Pressable className='w-[45%] bg-red-100 h-40 rounded-lg' onPress={() => router.push(`/post/${post.id}`)}>
      <Image source={{ uri: post?.files?.[0]?.url }} className='w-full h-full rounded-lg' />
      <View className='absolute w-full h-full bg-black/50 justify-end'>
        <Text className='text-white font-bold mb-3 ml-2' numberOfLines={1} ellipsizeMode='tail'>{post.tittle}</Text>
      </View>
    </Pressable>
  )
}

type ProfileHeaderProps = NonNullable<ReturnType<ReturnType<typeof api.useUtils>['user']['byId']['getData']>>
const ProfileHeader = (user: ProfileHeaderProps) => {
  return (
    <View className='flex gap-y-5 items-center  w-screen '>
      <Image source={{ uri: user?.imageUrl }} className='w-28 h-28 rounded-full' />
      <View className='flex items-center'>
        <Text className='text-white font-bold text-xl'>@{user?.username}</Text>
        <Text className='text-gray-300 font-semibold text-lg'>{user?.firstName} {user?.lastName}</Text>
      </View>
      <Button variants='fill' className='w-6/12 mb-5'><Text className='font-bold text-lg'>Follow</Text></Button>
    </View>

  )
}

export default Profile 
