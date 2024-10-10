// src/utils/faceMatcher.ts

import { faceapi } from './faceApiConfig.js';
import fetch from 'node-fetch';
import { Canvas, Image, createCanvas, loadImage } from 'canvas';


/**
 * Fetches an image from a URL and returns it as a Buffer.
 * @param url - The URL of the image to fetch.
 * @returns A promise that resolves to a Buffer containing the image data.
 */
const fetchImageBuffer = async (url: string): Promise<Buffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${url}`);
  }
  const arrayBuffer = await response.arrayBuffer(); 
  return Buffer.from(arrayBuffer);
};

/**
 * Converts a Buffer to a node-canvas Image object, which can then be used for face-api.js.
 * @param buffer - The Buffer containing image data.
 * @returns A promise that resolves to a Canvas Image object.
 */
const bufferToImage = async (buffer: Buffer): Promise<Canvas> => {
  const img = await loadImage(buffer); // Load the image from buffer
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height); // Draw image to canvas

  return canvas;
};

/**
 * Compares two images to determine if they contain the same face.
 * @param storedImageUrl - The URL of the stored profile image.
 * @param capturedImageFile - The captured image file uploaded by the user.
 * @returns A promise that resolves to a boolean indicating whether the faces match.
 */
export const matchFaces = async (
  storedImageUrl: string,
  capturedImageFile: any
): Promise<boolean> => {
  try {
    // Fetch and process stored profile image
    const storedImageBuffer = await fetchImageBuffer(storedImageUrl);
    const storedImgCanvas = await bufferToImage(storedImageBuffer);
    const storedDetections = await faceapi
      .detectSingleFace(storedImgCanvas)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!storedDetections) {
      throw new Error('No face detected in the stored profile image.');
    }

    // Read and process captured image file
    const capturedImageBuffer = await new Promise<Buffer>(async (resolve, reject) => {
      const chunks: Buffer[] = [];
      const { createReadStream } = await capturedImageFile;
      const stream = createReadStream();

      stream.on('data', (chunk: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) => chunks.push(Buffer.from(chunk)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });

    const capturedImgCanvas = await bufferToImage(capturedImageBuffer);
    const capturedDetections = await faceapi
      .detectSingleFace(capturedImgCanvas)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!capturedDetections) {
      throw new Error('No face detected in the captured image.');
    }

    // Compare descriptors
    const distance = faceapi.euclideanDistance(
      storedDetections.descriptor,
      capturedDetections.descriptor
    );
    console.log(`Face distance: ${distance}`);

    const threshold = 0.6; // Adjust the threshold based on sensitivity
    return distance < threshold;
  } catch (error) {
    console.error('Error in matchFaces:', error);
    throw error;
  }
};
