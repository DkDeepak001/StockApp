import { RNS3, Response, Options } from 'react-native-aws3'
import uuid from 'react-native-uuid'

type uploadToS3Types = {
  location: string
  fileData: {
    uri: string
    type: string
  }
}
type CustomResponse = Response & {
  body: {
    postResponse: postResponseType;

  };
};

type postResponseType = {
  bucket: string
  etag: string
  key: string
  location: string,
  id: string
}


export async function uploadToS3({ fileData, location }: uploadToS3Types): Promise<postResponseType> {
  const id = uuid.v4();
  const MetaData = {
    uri: fileData.uri,
    name: `post-${id}.${fileData.type?.split("/")[1]}`,
    type: fileData.type
  }
  const options: Options = {
    keyPrefix: `${location}/`,
    bucket: process.env.EXPO_PUBLIC_AWS_BUCKET_NAME!,
    region: process.env.EXPO_PUBLIC_AWS_REGION!,
    accessKey: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY!,
    secretKey: process.env.EXPO_PUBLIC_AWS_SECRET_KEY!,
    successActionStatus: 201,
  }

  const response: CustomResponse = await RNS3.put(MetaData, options)
    .progress((e) => console.log(e.loaded / e.total)) as CustomResponse;

  if (response.status !== 201) {
    throw new Error("Failed to upload image to S3");
  } else {
    console.log(response.body.postResponse)
    return { ...response.body.postResponse, id: id } as postResponseType;
  }

}

