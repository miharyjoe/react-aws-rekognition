import React, {ChangeEvent, useEffect, useState} from "react";
import "./App.css";
import { Rekognition } from "aws-sdk";
import { readFile } from "./logic/ReadImg";
import Card from "./components/Card";
import facePosition from "./components/FacePosition";
import NavBar from "./components/NavBar";

function App() {
  const [result, setResult] = useState<Rekognition.Types.DetectFacesResponse>({
    FaceDetails: [],
  });
  const [imageDataURL, setImageDateURL] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement> | any) => {
    const [file] = event.target.files;
    setResult({ FaceDetails: [] });
    setImageDateURL("");
    setImagePreview(URL.createObjectURL(file));
    readFile(
      event,
      (err: Error, data: Rekognition.Types.DetectFacesResponse) => {
        if (err) {
          throw new Error(err.message);
        }
        setResult(data);
      },
      setImageDateURL
    );
    return setTimeout(()=>{
      setLoading(true)
    },3000)
  };
  const ress = result.FaceDetails?.at(0);
  function getBoundingBox(e: any, data: object){
    const bord = document.getElementById('border');
    bord!.style.height = Object.values(data)[0];
    bord!.style.left = Object.values(data)[1];
    bord!.style.top = Object.values(data)[2];
    bord!.style.width = Object.values(data)[3];
  }
  return (
    <>
      <div className="container1">
        <label htmlFor="formFileLg" className="form-label label">
          <h1>Choose your image to analyse</h1>
        </label>
        <input
            className="form-control form-control-lg"
            id="formFileLg"
            type="file"
            onChange={(e) => handleChange(e)}
            accept="image/*"
        />
      </div>
      {console.log(ress)}
      {!loading ? (
              <div className="loader-container">

              </div>
          ) :
          <Card>
            <div className="col-md-4 profile  profilePhotoContainer" >
              <img src={imagePreview} className="img-fluid rounded-start profilePhoto"  alt=""
                   onLoad={ (e: any)=>{facePosition(imagePreview, ress)}}/>
            </div>
            <div className="col-md-8" >
              <div className="card-body">
                <h3 className="card-title">Result Analyse</h3>
                <div className="card cardlist" >
                  <Card imagePreview={imagePreview} ress={ress}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <h3>Age Range</h3>
                        <div>Low: {ress?.AgeRange?.Low}</div>
                        <div>High: {ress?.AgeRange?.High}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Gender</h3>
                        <div>{ress?.Gender?.Value}</div>
                        <div>{ress?.Gender?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Smile</h3>
                        <div>{ress?.Smile?.Value?.toString()}</div>
                        <div>{ress?.Smile?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Beard</h3>
                        <div>{ress?.Beard?.Value?.toString()}</div>
                        <div>{ress?.Beard?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Eyes Open</h3>
                        <div>{ress?.EyesOpen?.Value?.toString()}</div>
                        <div>{ress?.EyesOpen?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Eyesglasses</h3>
                        <div>{ress?.Eyeglasses?.Value?.toString()}</div>
                        <div>{ress?.Eyeglasses?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Mouth open</h3>
                        <div>{ress?.MouthOpen?.Value?.toString()}</div>
                        <div>{ress?.MouthOpen?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Mustache</h3>
                        <div>{ress?.Mustache?.Value?.toString()}</div>
                        <div>{ress?.Mustache?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Sunglasses</h3>
                        <div>{ress?.Sunglasses?.Value?.toString()}</div>
                        <div>{ress?.Sunglasses?.Confidence}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Emotions</h3>
                        <div>{ress?.Emotions?.at(0)?.Type}</div>
                        <div>{ress?.Emotions?.at(0)?.Confidence}</div>
                        <div>{ress?.Emotions?.at(1)?.Type}</div>
                        <div>{ress?.Emotions?.at(1)?.Confidence}</div>
                        <div>{ress?.Emotions?.at(2)?.Type}</div>
                        <div>{ress?.Emotions?.at(2)?.Confidence}</div>
                        <div>{ress?.Emotions?.at(3)?.Type}</div>
                        <div>{ress?.Emotions?.at(3)?.Confidence}</div>
                        <div>{ress?.Emotions?.at(4)?.Type}</div>
                        <div>{ress?.Emotions?.at(4)?.Confidence}</div>
                        <div>{ress?.Emotions?.at(5)?.Type}</div>
                        <div>{ress?.Emotions?.at(5)?.Confidence}</div>
                        <div>{ress?.Emotions?.at(6)?.Type}</div>
                        <div>{ress?.Emotions?.at(6)?.Confidence}</div>
                        <div>{ress?.Emotions?.at(7)?.Type}</div>
                        <div>{ress?.Emotions?.at(7)?.Confidence}</div>
                      </li>

                      <li className="list-group-item">
                        <h3>Pose</h3>
                        <div>Pitch : {ress?.Pose?.Pitch}</div>
                        <div>Yaw : {ress?.Pose?.Yaw}</div>
                        <div>Roll : {ress?.Pose?.Roll}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Quality</h3>
                        <div>Brightness : {ress?.Quality?.Brightness}</div>
                        <div>Sharpness : {ress?.Quality?.Sharpness}</div>
                      </li>
                      <li className="list-group-item">
                        <h3>Confidence</h3>
                        <div>{ress?.Confidence}</div>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
      }
    </>
  );
}

export default App;
