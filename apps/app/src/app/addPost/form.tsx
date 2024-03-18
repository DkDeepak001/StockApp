import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostFormSchema, CreatePostSchema } from "@stockHub/validators";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Keyboard, LayoutRectangle, Pressable, ScrollView, Text, View } from "react-native";
import { Button } from "~/components/commons/button";
import { FormInput } from "~/components/commons/textInput";
import { useSelectedImages } from "~/store/post";
import { api } from "~/utils/api";
import { uploadToS3 } from "~/utils/uploadTos3";
import { MentionInput, MentionSuggestionsProps } from 'react-native-controlled-mentions'
import { FC, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const FormScreen = () => {
  const selecetedImages = useSelectedImages(state => state.selectedImages)
  const setSelectedImages = useSelectedImages(state => state.setSelectedImage)
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
  const [value, setValue] = useState("")
  const [layout, setLayout] = useState<LayoutRectangle | null>()
  const suggestions = [
    { id: '1', name: 'David Tabaka' },
    { id: '2', name: 'Mary' },
    { id: '3', name: 'Tony' },
    { id: '4', name: 'Mike' },
    { id: '5', name: 'Grey' },
  ];

  const renderSuggestions: FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress, }) => {
    if (keyword == null) {
      return null;
    }
    console.log(layout)
    return (
      <ScrollView className={`bg-cyan-50 absolute  max-h-40 z-30 w-40 ml-4`}
        style={{
          top: layout?.height ?? 40 - 20
        }}
        nestedScrollEnabled={true}>
        {suggestions
          .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
          .map(one => (
            <Pressable
              key={one.id}
              onPress={() => {
                Keyboard.dismiss()
                onSuggestionPress(one)
              }}

              style={{ padding: 12 }}
            >
              <Text>{one.name}</Text>
            </Pressable>
          ))
        }
      </ScrollView>
    );
  };
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
        <FormInput
          control={control}
          name="content"
          error={errors.content?.message!}
          placeholder="Description"
          className="h-40"
          textAlignVertical="top"
        />
        <MentionInput
          value={value}
          onChange={setValue}
          onLayout={(e) => setLayout(e.nativeEvent.layout)}
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            color: "white",
            fontWeight: "700"
          }}
          containerStyle={{
            height: 400,
            width: "85%",
            backgroundColor: '#27272a',
            borderRadius: 16
          }}
          placeholderTextColor="gray"
          placeholder="Description"
          textAlignVertical="top"
          partTypes={[
            {
              trigger: '#', // Should be a single character like '@' or '#'
              renderSuggestions,

              textStyle: { fontWeight: 'bold', color: 'white', }, // The mention style in the input
            },
          ]}
        />
        <Button variants="fill" onPress={handleSubmit(handlePost)} >
          <Text className="font-extrabold text-lg uppercase">Post</Text>
        </Button>
      </View>
    </ScrollView>

  )
};

export default FormScreen;



