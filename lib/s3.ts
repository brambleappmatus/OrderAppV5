import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  endpoint: 'https://enxxhyedzkatrwiwapzl.supabase.co/storage/v1/s3',
  credentials: {
    accessKeyId: '87041c02a4d7e84a203362df9786b892',
    secretAccessKey: '99c0609a8e9cf32eead51b0229e346d5bde130b6d5a7c40349f1423423a5f35b'
  },
  region: 'auto'
});

export async function uploadToS3(file: File, path: string): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: 'images',
        Key: path,
        Body: buffer,
        ContentType: file.type
      })
    );

    return `https://enxxhyedzkatrwiwapzl.supabase.co/storage/v1/object/public/images/${path}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

export async function deleteFromS3(path: string): Promise<void> {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'images',
        Key: path
      })
    );
  } catch (error) {
    console.error('Error deleting from S3:', error);
    throw error;
  }
}