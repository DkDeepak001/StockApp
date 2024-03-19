import { View, Text } from 'react-native'
import React from 'react'
import { PostProps } from '../commons/post'

import {
  Part,
  parseValue,
  isMentionPartType,
} from 'react-native-controlled-mentions';
import { router } from 'expo-router';

type PostDetailsProps = Pick<PostProps, 'tittle' | "description">

const PostDetails = ({ description, tittle }: PostDetailsProps) => {
  const { parts } = parseValue(description!, [{ trigger: "#" }])
  const renderPart = (
    part: Part,
    index: number,
  ) => {
    if (!part.partType) {
      return <Text key={index}>{part.text}</Text>;
    }
    if (isMentionPartType(part.partType)) {
      return (
        <Text
          key={`${index}-${part.data?.trigger}`}
          //@ts-ignore
          style={part.partType.textStyle, {
            color: "blue"
          }}
          onPress={() => router.push(`/tag/${part.data?.id!}`)}
        >
          {part.text}
        </Text>
      );
    }
    return (
      <Text
        key={`${index}-pattern`}
        style={part.partType.textStyle}
      >
        {part.text}
      </Text>
    );
  };
  return (
    <View className='flex flex-col gap-y-1 px-4 pb-4'>
      <Text className='font-bold text-xl text-white'>{tittle}</Text>
      <Text className='font-normal text-sm text-white'>{parts.map(renderPart)}</Text>
    </View>
  )
}

export default PostDetails 
