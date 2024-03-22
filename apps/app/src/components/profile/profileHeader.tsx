import { Image } from "expo-image"
import { Text, View } from "react-native"
import { api } from "~/utils/api"
import { Button } from "../commons/button"
import { showMessage } from "react-native-flash-message"
import { useUser } from "@clerk/clerk-expo"

export type ProfileHeaderProps = NonNullable<ReturnType<ReturnType<typeof api.useUtils>['user']['byId']['getData']>>
export const ProfileHeader = (user: ProfileHeaderProps) => {
  const { user: me } = useUser()
  const context = api.useUtils()
  const { mutateAsync: addFollow, isLoading } = api.user.follow.useMutation({

    onMutate: async () => {
      await context.user.byId.cancel()
      context.user.byId.setData({ id: user.id }, (old) => {
        if (!old) return old
        return {
          ...old,
          hasFollowing: !old.hasFollowing
        }
      })

    },
    onSettled: () => {
      context.user.byId.invalidate()
    }
  })

  const handleFollow = async () => {
    try {
      const content = user.hasFollowing ? ` Suscessfully unfollowed ${user.username}`
        : ` you are now following ${user.username}`

      showMessage({
        type: 'success',
        message: content
      })
      await addFollow({
        followingId: user.id
      })

    } catch (error) {
      console.log(error)
      showMessage({
        type: 'danger',
        message: 'Something went wrong'
      })
    }

  }
  return (
    <View className='flex gap-y-5 items-center  w-screen '>
      <Image source={{ uri: user?.imageUrl }} className='w-28 h-28 rounded-full' />
      <View className='flex items-center'>
        <Text className='text-white font-bold text-xl'>@{user?.username}</Text>
        <Text className='text-gray-300 font-semibold text-lg'>{user?.firstName} {user?.lastName}</Text>
      </View>
      {me?.id !== user.id &&
        <Button variants='fill' className='w-6/12 mb-5' onPress={handleFollow} disabled={isLoading}>
          <Text className='font-bold text-lg'>{user.hasFollowing ? 'unfollow' : "Follow"}</Text>
        </Button>}
    </View>

  )
}

