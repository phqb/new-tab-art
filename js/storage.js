function getFromStorage(keys, callback) {
  console.log(`Loading ${keys} from storage`);
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(keys, data => {
      console.log(JSON.stringify(data));
      callback(data);
    });
  } else {
    callback({});
  }
}

function saveToStorage(data) {
  console.log(`Saving ${JSON.stringify(data)} to storage`);
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set(data, () => console.log('Saved'));
  }
}
