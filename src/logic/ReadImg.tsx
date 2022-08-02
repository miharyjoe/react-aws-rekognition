import React from "react";
import  rekognitionClient  from "../config/rekognitionClient";
import { detectFace } from "./DetectFace";
import AWS from "aws-sdk";

export const readFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (
        err: Error,
        data: AWS.Rekognition.Types.DetectFacesResponse
    ) => void,
    setImageDataURL: (image: string) => void
) => {
    rekognitionClient();

    const [file] = event.target.files as unknown as any[];
    const reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {
            let image = null;
            let jpg = true;
            try {
                image = atob(
                    (e?.target?.result as string)?.split("data:image/jpeg;base64,")[1]
                );
            } catch (e) {
                jpg = false;
            }
            if (jpg == false) {
                try {
                    image = atob(
                        (e?.target?.result as string).split("data:image/png;base64,")[1]
                    );
                } catch (e) {
                    console.error("Something went wrong");
                    return;
                }
            }
            if (!image) {
                console.error("Something went wrong");
                return;
            }
            setImageDataURL(e?.target?.result as string);
            let length = image.length;
            let imageBytes = new ArrayBuffer(length);
            let ua = new Uint8Array(imageBytes);
            for (let i = 0; i < length; i++) {
                ua[i] = image.charCodeAt(i);
            }
            detectFace(ua, callback);
        };
    })(file);

    reader.readAsDataURL(file);
};
