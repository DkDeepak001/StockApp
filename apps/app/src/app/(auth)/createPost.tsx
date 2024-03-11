import { useCallback, useLayoutEffect, useRef, useState } from "react"
import {
  View,
  Pressable,
  PermissionsAndroid,
  BackHandler,
  ToastAndroid,
  Text
} from "react-native"
import { useNavigation, useRouter } from "expo-router"
import { usePageInteraction } from "../../utils/pageInteraction"
import { useIsReady } from '../../utils/utilsfn'
import { launchImageLibrary, launchCamera, Asset } from 'react-native-image-picker';
import { showMessage } from "react-native-flash-message"
import Carousel from "../../components/carousel"
import { type FlashList } from "@shopify/flash-list"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons"
import { Button } from "~/components/commons/button"

export type UpdateEditImageProps = Pick<Asset, "height" | "width" | "uri">

const CreatorMode = () => {
  const navigation = useNavigation()
  const router = useRouter()

  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);
  const [crop, setCrop] = useState<boolean>(false)
  const scrollRef = useRef<FlashList<Asset>>(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)


  const handleBack = () => {
    if (crop) setCrop(false)
    else navigation.goBack()
    return true
  }

  useLayoutEffect(() => {
    getPermissions()
    navigation.setOptions({
      headerRight: () => {
        if (crop || selectedImages.length === 0) return
        return (
          <Pressable className="mr-1 p-2" onPress={() => handleRemoveSelectedImage()}>
            <MaterialIcons name="delete-outline" size={24} color="white" />
          </Pressable>
        )
      },

    })
    BackHandler.addEventListener("hardwareBackPress", handleBack)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack)
    }
  }, [navigation, crop, selectedImages.length])


  const handleRemoveSelectedImage = () => {
    const indexToRemove = scrollRef.current!.props.initialScrollIndex as number
    setSelectedImages((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(indexToRemove, 1);
      return newArray;
    });
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
        setSelectedImages((prev) => [...prev, ...res.assets!])
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

  const openCamera = useCallback(async () => {
    try {
      const cameraRes = await launchCamera({
        quality: 1,
        includeBase64: false,
        mediaType: "mixed",
        videoQuality: "medium",
        formatAsMp4: true,
        saveToPhotos: true,
        durationLimit: 60,

      })
      if (cameraRes.didCancel) {
        console.log("User cancelled")
      } else if (cameraRes.errorCode) {
        console.log("ImagePickerError: ", cameraRes.errorMessage)
      } else {
        if (cameraRes.assets) {
          setSelectedImages((prev) => [...prev, ...cameraRes.assets!])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [])



  const handleContinue = useCallback(async () => {
    try {
      let conditionsPassed = true;
      if (!selectedImages?.length) {
        CreatorModeError("Please select an image to continue");
        return;
      }
      if (selectedImages?.length > 10) {
        CreatorModeError("Max 10 Memes are allowed");
        return;
      }

      selectedImages?.forEach((assets, index) => {
        const fileSizeInMB = assets.fileSize! / (1024 * 1024);
        if (assets.type?.includes("image") && fileSizeInMB >= 10) {
          CreatorModeError("image should be less than 10MB");
          conditionsPassed = false;
          scrollRef.current?.scrollToIndex({ index: index, animated: true });
          return;
        }
      });

      if (!conditionsPassed) {
        return; // Exit the function if any condition failed
      }
      // router.push({ pathname: "/creator/form", params: { selectedImages: JSON.stringify(selectedImages) } })
    } catch (error) {
      console.log(error)
    }
  }, [selectedImages.length, crop, activeSlide])

  // if (loading || !ready)
  //   return (
  //     <View className="flex-1 bg-brand-bg">
  //       <Text className="text-white">Loading</Text>
  //     </View>
  //   )

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
      <Button variants="fill" >
        <Text className="font-extrabold text-lg tracking-wide">NEXT</Text>
      </Button>
    </View>
  )
}

export default CreatorMode

const CreatorModeError = (title: string) => showMessage({
  message: title,
  type: "danger",
  icon: "danger",
  position: "top",
  style: {
    height: "100%",
    top: "10%"
  }
});



