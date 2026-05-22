import '@testing-library/jest-dom'

// Node 22 sets global localStorage = undefined (experimental feature without a file).
// jsdom provides window.localStorage — promote it to global so hooks can use it.
if (typeof localStorage === 'undefined') {
  let store = {}
  global.localStorage = {
    getItem:    (k)    => Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null,
    setItem:    (k, v) => { store[k] = String(v) },
    removeItem: (k)    => { delete store[k] },
    clear:      ()     => { store = {} },
    key:        (i)    => Object.keys(store)[i] ?? null,
    get length()       { return Object.keys(store).length },
  }
}
