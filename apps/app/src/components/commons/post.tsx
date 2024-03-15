import { FontAwesome6, Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { View, Text, Pressable } from 'react-native'
import { api } from '~/utils/api'
import Pagination from '../onboarding/pagiantion';
import { files, posts } from '@stockHub/db/src/schema/schema';
import { useState } from 'react';
import PostImages from '../post/images';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import PostDetails from '../post/postDetails';
import PostAction from '../post/postAction';
import PostUserDetails from '../post/postUserDetails';


export type PostProps = NonNullable<ArrayElement<Exclude<ReturnType<ReturnType<typeof api.useUtils>['post']['all']['getData']>, undefined>>>;

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const Post = ({
  id,
  tittle,
  description,
  author,
  fromNow,
  files
}: PostProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)

  return (
    <View className='w-full bg-zinc-800 flex flex-col gap-y-1' key={id}>
      <PostUserDetails
        author={author}
        fromNow={fromNow}
      />
      <PostImages
        images={files}
        setActive={(num: number) => setActiveSlide(num)}
        active={activeSlide}
      />

      <PostAction
        postLength={files.length}
        activeSlide={activeSlide}
      />
      <PostDetails
        tittle={tittle}
        description={description}
        key={posts.id}
      />
    </View >
  )
}

export default Post
