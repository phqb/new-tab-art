function extractDataFromReddit(json) {
  const postData = json[0].data.children[0];
  const imageData = postData.data;

  if (postData.kind != 't3' || imageData.post_hint != 'image') {
    return;
  } else {
    return {
      permalink: imageData.permalink,
      title: imageData.title,
      domain: imageData.domain,
      author: imageData.author,
      url: imageData.url,
      thumbnail: imageData.thumbnail
    };
  }
}

function loadImageOnBackground(url, onSuccess, onError) {
  const imageLoader = new Image();
  imageLoader.onload = onSuccess;
  imageLoader.onerror = onError;
  imageLoader.src = url;
}
