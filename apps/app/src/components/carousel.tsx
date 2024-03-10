import { FlatList } from "react-native-gesture-handler"
import { type FlashList } from "@shopify/flash-list"
import { RefObject } from "react"
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, useWindowDimensions } from "react-native"
import { View } from "react-native"
import { Asset } from "react-native-image-picker"
import { Image } from "expo-image"
import Pagination from "./onboarding/pagiantion"


type CarouselType = {
  selectedImages: Asset[]
  setActiveSlide: (val: number) => void
  active: number
  scrollRef: FlashList<Asset> | RefObject<FlashList<Asset>>
}

const Carousel = ({ selectedImages, scrollRef, active, setActiveSlide }: CarouselType) => {
  const { width } = useWindowDimensions()


  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveSlide(Math.round(e.nativeEvent.contentOffset.x / (width + 20)))
  }


  return (
    <>
      <FlatList
        initialScrollIndex={active}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            scrollRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
        getItemLayout={(data, index) => {
          return (
            { length: width, offset: width * index, index }
          )
        }}
        estimatedItemSize={width * selectedImages.length}
        data={selectedImages}
        ref={scrollRef}
        renderItem={({ item }: { item: Asset }) => renderItem({ item })}
        keyExtractor={(item) => item.uri!}
        horizontal
        onScroll={handleScroll}
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
      />
      <Pagination dots={selectedImages.length} active={active} className="h-1.5 w-1.5" />
    </>
  )
}


const styles = StyleSheet.create({
  landscapeContainer: {
    aspectRatio: 16 / 9, // Landscape aspect ratio
    width: "100%",
  },
  portraitContainer: {
    height: "95%",
    width: "100%",
    aspectRatio: 9 / 16, // Portrait aspect ratio
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});


const renderItem = ({ item }: { item: Asset }) => {
  const orientation = item.width! > item.height! ? 'landscape' : 'portrait';
  return (
    <View className="items-center justify-center h-full px-3 w-screen">
      <View style={orientation === 'landscape' ? styles.landscapeContainer : styles.portraitContainer}>
        <Image
          source={{ uri: item.uri! }}
          style={styles.image}
        />

      </View>
    </View>
  )
}





export default Carousel

