function openTopSites() {
  MicroModal.show('topsites-modal');
}

function openSettings() {
  MicroModal.show('settings-modal');
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [imageData, setImageData] = React.useState(null);

  React.useEffect(() => {
    const currentDate = new Date().getDate();
    getFromStorage(
      ['changeArtworkMethod', 'lastChangeDate', 'imageData'],
      ({ changeArtworkMethod, lastChangeDate, imageData }) => {
        if (
          (changeArtworkMethod || DEFAULT_SETTINGS.changeArtworkMethod) !==
            'daily' ||
          !lastChangeDate ||
          currentDate !== lastChangeDate
        ) {
          tryGetNewImage();
        } else {
          tryShowImage(imageData);
        }
      }
    );
  }, []);

  function tryGetNewImage(numOfAttempts = 0) {
    if (numOfAttempts === 5) {
      return;
    }

    getFromStorage('subreddits', ({ subreddits }) => {
      const subsToChoose = subreddits || DEFAULT_SETTINGS.subreddits;
      const chosenSub =
        subsToChoose[Math.floor(Math.random() * subsToChoose.length)];

      fetch(`https://www.reddit.com/r/${chosenSub}/random.json`).then(
        response => {
          if (!response.ok) {
            tryGetNewImage(numOfAttempts + 1);
          } else {
            response.json().then(json => {
              const imageData = extractDataFromReddit(json);
              if (imageData) {
                tryShowImage(imageData, numOfAttempts);
                saveToStorage({ imageData });
                saveToStorage({ lastChangeDate: new Date().getDate() });
              } else {
                console.log('This post is not an image. Retrying.');
                tryGetNewImage(numOfAttempts + 1);
              }
            });
          }
        }
      );
    });
  }
  
  function tryShowImage(imageData, numOfAttempts = 0) {
    setIsLoading(true);
    setImageData(imageData);

    loadImageOnBackground(
      imageData.url,
      () => setIsLoading(false),
      () => {
        console.log(`Can't load image from ${imageData.url}`);
        tryGetNewImage(numOfAttempts + 1);
      }
    );
  }

  function getNewImage() {
    setIsLoading(true);
    setImageData(null);
    tryGetNewImage();
  }

  const getBackgroundPlaceholder = () =>
    imageData ? `url(${imageData.thumbnail})` : 'none';

  const getBackground = () =>
    isLoading ? getBackgroundPlaceholder() : `url(${imageData.url})`;

  return html`
    <div class="container">
      <div class="container__image-container">
        <div class="container__image-container__image-background"></div>
        <div
          class="container__image-container__image"
          style=${{
            backgroundImage: getBackground(),
            filter: isLoading ? 'blur(8px)' : 'none'
          }}
        ></div>
        <div
          class="container__image-container__image__loading-icon-container"
          style=${{ visibility: isLoading ? 'visible' : 'hidden' }}
        >
          <i
            class="container__image-container__image__loading-icon-container__icon fas fa-sync-alt"
          ></i>
        </div>
      </div>
      ${!isLoading &&
        html`
          <${Description} imageData=${imageData} getNewImage=${getNewImage} />
        `}
      <button
        class="btn container__settings-button"
        title="Settings"
        onClick=${openSettings}
      >
        <i class="fas fa-cog container__settings-button__icon" />
      </button>
      <button
        class="btn container__tabs-button"
        title="Top sites"
        onClick=${openTopSites}
      >
        <i class="fas fa-window-maximize container__tabs-button__icon" />
      </button>
      <${TopSites} />
      <${Settings} />
    </div>
  `;
}
