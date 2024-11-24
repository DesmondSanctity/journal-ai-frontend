import { CLOUDINARY_API_KEY } from '@/constants';
import { useAuthStore } from '@/store/auth-store';
import { getPublicIdFromUrl } from './journal';

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
 return data.secure_url;
}

export async function deleteAudioFile(audioUrl: string) {
 const pubKey = CLOUDINARY_API_KEY;
 const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

 if (!pubKey) {
  throw new Error('Cloudinary API key is not defined');
 }

 if (!cloudName) {
  throw new Error('Cloudinary cloud name is not defined');
 }

 const publicId = getPublicIdFromUrl(audioUrl);

 const formData = new FormData();
 formData.append('public_id', publicId);
 formData.append('api_key', pubKey);

 const response = await fetch(
  `https://api.cloudinary.com/v1_1/${cloudName}/destroy`,
  {
   method: 'POST',
   body: formData,
  }
 );

 const data = await response.json();
 return data.result;
}
