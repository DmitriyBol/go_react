/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}