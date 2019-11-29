export let _Storage = {
  set: function (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  get: function (key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  remove: function (key) {
    window.localStorage.removeItem(key);
  }
};
