export * from "@testing-library/react";
import "@testing-library/jest-dom"; // This line is important for Jest DOM matchers
export { default as userEvent } from "@testing-library/user-event";
import { setConfig } from "next/config";
import config from "./next.config";
setConfig(config);

global.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

global.ResizeObserver = class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
};

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
