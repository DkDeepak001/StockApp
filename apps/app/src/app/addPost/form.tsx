import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostFormSchema, CreatePostSchema } from "@stockHub/validators";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { LayoutRectangle, Pressable, ScrollView, Text, View } from "react-native";
import { Button } from "~/components/commons/button";
import { FormInput } from "~/components/commons/textInput";
import { useSelectedImages } from "~/store/post";
import { api } from "~/utils/api";
import { uploadToS3 } from "~/utils/uploadTos3";
import { useEffect, useState } from "react";
import { MentionInput } from "~/components/commons/mentionedInputs";
import Loader from "~/components/commons/loader";


const FormScreen = () => {
  const [layout, setLayout] = useState<LayoutRectangle | null>()

  const selecetedImages = useSelectedImages(state => state.selectedImages)
  const setSelectedImages = useSelectedImages(state => state.setSelectedImage)
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(CreatePostFormSchema)
  })

  useEffect(() => {
    watch('content')
  }, [watch('content')])
  const { mutateAsync: addPost, isLoading: isPostAdding } = api.post.add.useMutation({
    onSuccess: () => {
      router.push('/feed')
      setSelectedImages([])
    }
  })
  const handlePost = async (data: CreatePostSchema) => {
    try {
      const uploadedImages = await Promise.all(
        selecetedImages.map(async (f) => {
          const uploadedData = await uploadToS3({
            fileData: {
              type: f.type!,
              uri: f.uri!,
            },
            location: "post"
          })
          return {
            url: uploadedData.location,
            height: f.height!,
            width: f.height!,
            fileId: uploadedData.id,
            path: uploadedData.key
          }
        }))
      await addPost({
        title: data.title,
        content: data.content,
        file: uploadedImages
      })
    } catch (error) {
      console.log(error, "app")
    }
  }
  if (isPostAdding) {
    return <Loader >
      <Text className="text-white font-bold">Uploading Post...</Text>
    </Loader>
  }

  return (
    <ScrollView className="flex-1" nestedScrollEnabled={true} keyboardShouldPersistTaps='handled' >
      <View className="flex-1 flex items-center">
        <Pressable >
          <Image source={require('../../../assets/images/auth/home.png')} className="h-60 w-60" />
        </Pressable>
        <FormInput
          control={control}
          name="title"
          error={errors.title?.message!}
          placeholder="Title"
        />
        <MentionInput
          placeholder="Description"
          value={getValues('content')}
          onChange={(t) => setValue("content", t)}
          layout={layout!}
          setLayout={(l: LayoutRectangle) => setLayout(l)}
        />
        <Button variants="fill" onPress={handleSubmit(handlePost)} className="mt-10" >
          <Text className="font-extrabold text-lg uppercase">Post</Text>
        </Button>
      </View>
    </ScrollView>
  )
};

export default FormScreen;



