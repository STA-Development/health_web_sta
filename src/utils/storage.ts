import * as Sentry from '@sentry/nextjs'

export const localStore = storageFactory

export const userCredentials = {
  accessToken: ''
}

export function storageFactory(storage: Storage): Storage {
  let inMemoryStorage: {[key: string]: string} = {}
  const length = 0

  function isSupported() {
    try {
      const testKey = '__some_random_key_you_are_not_going_to_use__'
      storage.setItem(testKey, testKey)
      storage.removeItem(testKey)
      return true
    } catch (e) {
      Sentry.captureException(e)
      return false
    }
  }

  function clear(): void {
    if (isSupported()) {
      storage.clear()
    } else {
      inMemoryStorage = {}
    }
  }

  function getItem(name: string): string | null {
    if (isSupported()) {
      return storage.getItem(name)
    }
    if (inMemoryStorage.name) {
      return inMemoryStorage[name]
    }
    return null
  }

  function key(index: number): string | null {
    if (isSupported()) {
      return storage.key(index)
    }
    return Object.keys(inMemoryStorage)[index] || null
  }

  function removeItem(name: string): void {
    if (isSupported()) {
      storage.removeItem(name)
    } else {
      delete inMemoryStorage[name]
    }
  }

  function setItem(name: string, value: string): void {
    if (isSupported()) {
      storage.setItem(name, value)
    } else {
      inMemoryStorage[name] = String(value) // not everyone uses TypeScript
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    length,
  }
}
