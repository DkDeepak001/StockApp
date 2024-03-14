import { useCallback, useLayoutEffect, useRef, useState } from "react"
import {
  View,
  Pressable,
  PermissionsAndroid,
  Text
} from "react-native"
import { useNavigation, useRouter } from "expo-router"
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { showMessage } from "react-native-flash-message"
import Carousel from "../../components/carousel"
import { type FlashList } from "@shopify/flash-list"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { Button } from "~/components/commons/button"
import { useSelectedImages } from "~/store/post";
import { scheduleFlushOperations } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";
import Loader from "~/components/commons/loader";

export type UpdateEditImageProps = Pick<Asset, "height" | "width" | "uri">

const CreatorMode = () => {
  const navigation = useNavigation()
  const router = useRouter()

  const selectedImages = useSelectedImages((state) => state.selectedImages)
  const setSelectedImages = useSelectedImages((state) => state.setSelectedImage)
  const scrollRef = useRef<FlashList<Asset>>(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)



  useLayoutEffect(() => {
    getPermissions()
    navigation.setOptions({
      headerRight: () => {
        if (selectedImages.length === 0) return
        return (
          <Pressable className="mr-2 p-2" onPress={() => handleRemoveSelectedImage()}>
            <MaterialIcons name="delete-outline" size={24} color="white" />
          </Pressable>
        )
      },

    })
  }, [selectedImages])


  const handleRemoveSelectedImage = () => {
    const indexToRemove = scrollRef.current!.props.initialScrollIndex as number
    selectedImages.splice(indexToRemove, 1)
    setSelectedImages(selectedImages);
  }


  const openImagePicker = useCallback(async () => {
    const res = await launchImageLibrary({
      quality: 1,
      selectionLimit: 10,
      mediaType: "photo",
      includeBase64: false,

    })
    if (res.didCancel) {
      console.log("User cancelled")
    } else if (res.errorCode) {
      console.log("ImagePickerError: ", res.errorMessage)
    } else {
      if (res.assets) {
        const newVal = [...selectedImages, ...res.assets!]
        setSelectedImages(newVal)
      }
    }
  }, [])

  const getPermissions = useCallback(async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA!,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE!,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO!,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES!,
      ])
    } catch (err) {
      console.warn(err)
    }
  }, [])


  const handleContinue = useCallback(async () => {
    try {
      let conditionsPassed = true;
      if (!selectedImages?.length) {
        ShowError("Please select an image to continue");
        return;
      }
      if (selectedImages?.length > 10) {
        ShowError("Max 10 Memes are allowed");
        return;
      }

      selectedImages?.forEach((assets, index) => {
        const fileSizeInMB = assets.fileSize! / (1024 * 1024);
        if (assets.type?.includes("image") && fileSizeInMB >= 10) {
          ShowError("image should be less than 10MB");
          conditionsPassed = false;
          scrollRef.current?.scrollToIndex({ index: index, animated: true });
          return;
        }
      });
      console.log("asdasd")

      if (!conditionsPassed) {
        return; // Exit the function if any condition failed
      }
      router.push({ pathname: "/addPost/form" })
    } catch (error) {
      console.log(error)
    }
  }, [selectedImages.length, activeSlide])


  return (
    <View className="h-full items-center justify-center flex flex-1 ">
      <View className="items-center flex justify-center pt-5 h-[90%]">
        {selectedImages.length === 0 ?
          <Pressable className="border-2 border-white p-5  rounded-xl" onPress={openImagePicker}>
            <Feather size={68} name="plus" color='white' />
          </Pressable>
          :
          <View className="h-[90%]">
            <Carousel
              selectedImages={selectedImages}
              setActiveSlide={(val: number) => setActiveSlide(val)}
              active={activeSlide}
              scrollRef={scrollRef}
            />
          </View>
        }
      </View>
      <Button variants="fill" onPress={handleContinue} >
        <Text className="font-extrabold text-lg tracking-wide">NEXT</Text>
      </Button>
    </View>
  )
}

export default CreatorMode

const ShowError = (title: string) => showMessage({
  message: title,
  type: "danger",
  icon: "danger",
  position: "top",
});



