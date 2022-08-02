import AWS, { Credentials } from "aws-sdk";

const RekognitionClient = () => {
    AWS.config.region = `${process.env.REACT_APP_REGION}`; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: `${process.env.REACT_APP_IDENTITY_POOL_ID}`
    });
    (AWS.config.credentials as Credentials).get(() => {
        const accessKeyId = AWS.config.credentials?.accessKeyId;
        const secretAccessKey = AWS.config.credentials?.secretAccessKey;
        const sessionToken = AWS.config.credentials?.sessionToken;
    });
};

export default RekognitionClient;