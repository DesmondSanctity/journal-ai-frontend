import { CLOUDINARY_API_KEY } from '@/constants';
import { useAuthStore } from '@/store/auth-store';
import crypto from 'crypto';

export async function saveAudioFile(blob: Blob) {
 const { user } = useAuthStore.getState();
 const userId = user?.id;
 const timestamp = Date.now();

 const pubKey = CLOUDINARY_API_KEY;
 const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
 const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

 if (!pubKey) {
  throw new Error('Cloudinary API key is not defined');
 }

 if (!cloudName) {
  throw new Error('Cloudinary cloud name is not defined');
 }
 const formData = new FormData();
 formData.append('file', blob);
 formData.append('upload_preset', preset || 'athene-ai-preset');
 formData.append('api_key', pubKey);
 formData.append('folder', `journal/${userId}`);
 formData.append('public_id', `${timestamp}-recording`);

 const response = await fetch(
  `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
  {
   method: 'POST',
   body: formData,
  }
 );

 if (!response.ok) {
  throw new Error('Failed to upload audio file');
 }

 const data = await response.json();
 return { url: data.secure_url, publicId: data.public_id };
}

export async function deleteAudioFile(publicId: string) {
 const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
 const apiSecret = process.env.CLOUDINARY_API_SECRET;
 const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

 if (!apiKey || !apiSecret || !cloudName) {
  throw new Error('Cloudinary credentials are not properly defined');
 }

 const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/video/${publicId}`;

 const response = await fetch(url, {
  method: 'DELETE',
  headers: {
   Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString(
    'base64'
   )}`,
  },
 });

 console.log('Response:', response);

 const data = await response.json();

 if (!response.ok) {
  throw new Error(
   `Failed to delete audio: ${data.error?.message || 'Unknown error'}`
  );
 }

 return data.result;
}


function generateSignature(publicId: string, timestamp: number) {
 const secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
 if (!secret) {
  throw new Error('Cloudinary API secret is not defined');
 }
 const str = `public_id=${publicId}&timestamp=${timestamp}${secret}`;
 return crypto.createHash('sha1').update(str).digest('hex');
}
