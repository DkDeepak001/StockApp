import {
  Text,
  LayoutRectangle,
  Pressable,
  Keyboard
} from "react-native"
import { MentionInputProps as MInputProps, MentionSuggestionsProps } from "react-native-controlled-mentions/dist/types"
import { MentionInput as MInput } from "react-native-controlled-mentions"
import { Dispatch, FC, SetStateAction } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { api } from "~/utils/api"


type RenderSuggestionsProps = MentionSuggestionsProps & {
  layout: Pick<MentionInputProps, "layout">['layout']
  tags: NonNullable<ReturnType<ReturnType<typeof api.useUtils>['hashTag']['all']['getData']>>
}

const RenderSuggestions: FC<RenderSuggestionsProps> = ({ keyword, onSuggestionPress, layout, tags }) => {
  if (keyword == null) {
    return null;
  }
  return (
    <ScrollView className={`bg-cyan-50 absolute  max-h-40 z-30 w-40 ml-4`}
      style={{
        top: layout?.height ?? 40 - 20
      }}
      nestedScrollEnabled={true}>
      {tags
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

type MentionInputProps = MInputProps & {
  value: string,
  layout: LayoutRectangle
  setLayout: (l: LayoutRectangle) => void
}

export const MentionInput = ({ value, layout, setLayout, ...props }: MentionInputProps) => {
  const { data: hashtag } = api.hashTag.all.useQuery()
  return (
    <MInput
      {...props}
      value={value}
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
          trigger: '#',
          renderSuggestions: (props) => <RenderSuggestions layout={layout} tags={hashtag ?? []} {...props} />,
          textStyle: { fontWeight: 'bold', color: 'white', },
        },
      ]}
    />)
}
