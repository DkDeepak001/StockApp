import { Text, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { api } from '~/utils/api'
import Loader from '~/components/commons/loader'
import { ProfileHeader } from '~/components/profile/profileHeader'
import { ProfilePost } from '~/components/profile/profilePost'

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
      ListEmptyComponent={() => <Text className='text-white text-center font-bold text-xl'>{user?.username} doesn't have any post </Text>}
      renderItem={({ item }) => <ProfilePost {...item} />}
    />
  )
}



export default Profile 
