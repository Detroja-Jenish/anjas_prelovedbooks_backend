import { DeleteObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import { IFile } from "../typees/awsType";
import errorMessages from "../../utils/errorMessages";

dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID!;
const bucketName = process.env.AWS_BUCKET_NAME!;
const booksFolder = process.env.AWS_BOOKS_FOLDER!;

if (!accessKeyId || !secretAccessKey || !bucketName || !booksFolder) {
    throw 'AWS configuration environment variables are missing';
}

export class AWSController {
    static client = new S3Client({
        region: "eu-north-1",
        credentials: {
            accessKeyId: accessKeyId!,
            secretAccessKey: secretAccessKey!,
        },
    });

    static deleteObjects = async (keys: string[]) => {
        try {
            const command = new DeleteObjectsCommand({
                Bucket: bucketName,
                Delete: {
                    Objects: keys.map(key => ({ Key: key.split("/").splice(3).join("/") })),
                },
            });

            const { Deleted } = await this.client.send(command);
            return Deleted;
        } catch (error) {
            throw errorMessages.awsObjectDidNotDelete;
        }
    };

    static getPutObjectUrl = async (file: IFile): Promise<string> => {
        try {
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: `${booksFolder}/${Date.now()}.${file.name.split(".").at(-1)}`,
                ContentType: file.type,
            });

            const url = await getSignedUrl(this.client, command, { expiresIn: 600 });
            return url;
        } catch (error) {
            throw errorMessages.awsDidNotGetPutURL;
        }
    };
}
