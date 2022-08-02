import React, {ChangeEvent, useEffect, useState} from "react";
import "./App.css";
import { Rekognition } from "aws-sdk";
import { readFile } from "./logic/ReadImg";



function App() {
    const [result, setResult] = useState<Rekognition.Types.DetectFacesResponse>({
        FaceDetails: [],
    });
    const [imageDataURL, setImageDateURL] = useState("");
    const handleChange = (event: ChangeEvent<HTMLInputElement> | any) => {
        setResult({ FaceDetails: [] });
        setImageDateURL("");
        readFile(
            event,
            (err: Error, data: Rekognition.Types.DetectFacesResponse) => {
                if (err) {
                    throw new Error(err.message);
                }
                setResult(data);
                        },
            setImageDateURL
                    )
                }

    // @ts-ignore
    return (
        <>
            <div>
                <input type='file' onChange={(e)=> handleChange(e)} accept='image/*' className="imputImg"/>
            </div>
            {console.log(result)}
            <div className="box">
                <h2 className="header">
                    React drop files input
                </h2>
            </div>
            <div>
                {result.FaceDetails?.map((e: any) => {
                    return (<table>
                        <th>
                            <tr>{e.AgeRange}</tr>
                        </th>
                    </table>)
                })}
            </div>
        </>

    )
}

export default App;
