import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostFormSchema, CreatePostSchema } from "@stockHub/validators";
import { Image } from "expo-image";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Button } from "~/components/commons/button";
import { FormInput } from "~/components/commons/textInput";
import { api } from "~/utils/api";

const FormScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(CreatePostFormSchema)
  })

  const { mutateAsync: addPost, isLoading: isPostAdding } = api.post.add.useMutation({
    onSuccess: (data) => {
      console.log("post add success fully ", data)
    }
  })


  const handlePost = async (data: CreatePostSchema) => {
    try {
      await addPost({
        title: data.title,
        content: data.content,
        file: [{
          url: "https://investorsinsighthub.s3.amazonaws.com/ywJwlK0tlHHkND-MtN8gb-transformed.jpeg",
          width: 300,
          height: 300
        }]
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



