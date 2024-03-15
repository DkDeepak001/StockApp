import { View, Image as RnImage, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlashList } from '@shopify/flash-list';
import { PostProps } from '../commons/post';
import { Image } from 'expo-image';
import { files } from '@stockHub/db/src/schema/schema';


type PostImagesProps = FlashList<PostProps['files']> & {
  active: number,
  setActive: (num: number) => void
  images: PostProps['files']
}

const PostImages = ({ active, setActive, images, ...props }: PostImagesProps) => {
  const { width } = useWindowDimensions()

  const scrollRef = useRef(null)


  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActive(Math.round(e.nativeEvent.contentOffset.x / (width + 20)))
  }

  return (
    <FlashList
      initialScrollIndex={active}
      estimatedItemSize={width * images.length}
      data={images}
      ref={scrollRef}
      renderItem={({ item }: { item: PostProps['files'][0] }) => <RenderItem item={item} />}
      keyExtractor={(item) => item.id!}
      horizontal
      onScroll={handleScroll}
      pagingEnabled
      bounces={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  )
}


const RenderItem = ({ item }: { item: PostProps['files'][0] }) => {
  const { width: screenWidth } = useWindowDimensions()
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    RnImage.getSize(item.url || "", (width, height) => {
      setImageDimensions({ width, height })
    })
  }, [files])

  // TODO: make height calculations cleaner and terse
  const maxHeight = Math.floor(screenWidth * (3 / 4)) || 250

  const displayHeight =
    Math.floor(
      (screenWidth / imageDimensions.width) * imageDimensions.height,
    ) || 250

  const computedHeight = Math.floor(
    (screenWidth / imageDimensions.width) * imageDimensions.height,
  )
  return (
    <View className="h-80 items-center flex flex-row">
      <Image
        source={{ uri: item.url! }}
        style={{
          width: screenWidth,
          height: displayHeight > maxHeight
            ? maxHeight
            : displayHeight
        }}
        contentFit='contain'
      />
    </View>
  )
}

export default PostImages
