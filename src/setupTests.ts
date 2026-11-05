import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder for jsdom
globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;

// Shared i18next mock: langLink reads the global i18next instance
jest.mock('i18next', () => ({
  __esModule: true,
  default: { language: 'uk' },
  t: (key: string) => key,
}));
