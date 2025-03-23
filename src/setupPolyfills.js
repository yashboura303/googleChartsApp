// This file provides polyfills for any missing modules
if (typeof window !== "undefined") {
  // Mock the ajv/dist/compile/codegen module if it's missing
  window.global = window;
}
