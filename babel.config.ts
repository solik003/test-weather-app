import { TransformOptions } from '@babel/core';

const config: TransformOptions = {
  presets: [
    '@babel/preset-env', // Transpile to target your desired environments (e.g., modern browsers)
    '@babel/preset-react', // Add JSX support for React
    '@babel/preset-typescript', // Add TypeScript support
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Avoid duplication of helper functions
  ],
};

export default config;
