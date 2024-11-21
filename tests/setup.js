import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// 全局配置
config.global.mocks = {
  $t: (key) => key,
  $i18n: {
    locale: 'zh-CN'
  }
}

// Mock window
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})