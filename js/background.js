function updateSubredditsFromGist() {
  fetch('https://api.github.com/gists/f4dd51376811af9a464c8860946ca1ff').then(
    response => {
      if (response.ok) {
        response.json().then(json => {
          const files = json.files;
          const firstFile = files[Object.keys(files)[0]];
          const subreddits = firstFile.content
            .split(/\r?\n/)
            .map(e => e.trim())
            .filter(e => e.length > 0);
          if (subreddits.length > 0) {
            chrome.storage.local.set({ subreddits });
          }
        });
      }
    }
  );
}

setInterval(updateSubredditsFromGist, 15 * 60 * 1000);
updateSubredditsFromGist();
