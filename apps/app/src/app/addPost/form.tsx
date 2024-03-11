import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostFormSchema, CreatePostSchema } from "@stockHub/validators";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { Button } from "~/components/commons/button";
import { FormInput } from "~/components/commons/textInput";

const FormScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(CreatePostFormSchema)
  })

  const handlePost = (data: CreatePostSchema) => {
    try {
      console.log("handlePost")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 flex items-center">
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



