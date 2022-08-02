import AWS from "aws-sdk";

export const detectFace = (
    imageData: any,
    callback: (
        err: Error,
        data: AWS.Rekognition.Types.DetectFacesResponse
    ) => void
) => {
    const rekognition = new AWS.Rekognition();
    const params = {
        Image: {
            Bytes: imageData,
        },
        Attributes: ["ALL"],
    };
    rekognition.detectFaces(params, (err, data) => callback(err, data));
};
