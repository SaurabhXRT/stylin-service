// faceApiConfig.ts

import faceapi from 'face-api.js';
import { Canvas, Image,ImageData as NodeCanvasImageData } from 'canvas';
import  path from 'path';

/**
 * Monkey patches the face-api.js environment with canvas implementations.
 * This is necessary for face-api.js to function correctly in a Node.js environment.
 */
faceapi.env.monkeyPatch({
  Canvas: Canvas as unknown as typeof HTMLCanvasElement,
  Image: Image as unknown as typeof HTMLImageElement,
  ImageData: NodeCanvasImageData as unknown as typeof ImageData,
});

/**
 * Asynchronously loads the required face-api.js models from the specified directory.
 * Ensure that the models are downloaded and placed in the 'models' directory relative to this file.
 *
 * @throws Will throw an error if model loading fails.
 */
export const loadFaceApiModels = async (): Promise<void> => {
  const MODEL_PATH = './models';

  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
    console.log('Face-api.js models loaded successfully.');
  } catch (error) {
    console.error('Error loading face-api.js models:', error);
    throw error;
  }
};

// Exporting faceapi for use in other modules
export { faceapi };
