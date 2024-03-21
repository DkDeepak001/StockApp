import { useAuth } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ProfileHeader } from "~/components/profile/profileHeader";
import { ProfilePost } from "~/components/profile/profilePost";
import { api } from "~/utils/api";

const ProfileScreen = () => {
  const { userId } = useAuth()
  const { data: user } = api.user.byId.useQuery({ id: userId! }, {
    enabled: !!userId
  })
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
};

export default ProfileScreen;

