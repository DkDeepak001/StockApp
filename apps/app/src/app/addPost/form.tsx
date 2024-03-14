import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostFormSchema, CreatePostSchema } from "@stockHub/validators";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Button } from "~/components/commons/button";
import { FormInput } from "~/components/commons/textInput";
import { useSelectedImages } from "~/store/post";
import { api } from "~/utils/api";
import { uploadToS3 } from "~/utils/uploadTos3";


const FormScreen = () => {
  const selecetedImages = useSelectedImages(state => state.selectedImages)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(CreatePostFormSchema)
  })
  const { mutateAsync: addPost, isLoading: isPostAdding } = api.post.add.useMutation({
    onSuccess: () => {
      router.push('/feed')
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

  return (
    <ScrollView className="flex-1">
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
        <FormInput
          control={control}
          name="content"
          error={errors.content?.message!}
          placeholder="Description"
          className="h-40"
          textAlignVertical="top"
        />
        <Button variants="fill" onPress={handleSubmit(handlePost)} >
          <Text className="font-extrabold text-lg uppercase">Post</Text>
        </Button>
      </View>
    </ScrollView>
  )
};

export default FormScreen;



