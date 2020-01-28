function Description({ getNewImage, imageData }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const showDescription = () => setIsVisible(true);

  let leaveTimer = null;

  function hideDescription() {
    if (leaveTimer) {
      clearInterval(leaveTimer);
    }

    leaveTimer = setTimeout(() => setIsVisible(false), 10_000);
  }

  return html`
    <div
      class="container__description-container"
      style=${{ opacity: isVisible ? 1 : 0 }}
      onMouseEnter=${showDescription}
      onMouseLeave=${hideDescription}
    >
      <button
        class="btn container__description-container__reset-button"
        onClick=${getNewImage}
      >
        <i
          class="fas fa-redo container__description-container__reset-button__icon"
        />
      </button>
      <div class="container__description-container__text-container">
        <div
          class="container__description-container__text-container__title-container"
        >
          <a
            href="http://reddit.com${imageData.permalink}"
            class="container__description-container__text-container__title-container__title"
          >
            ${imageData.title}
          </a>
          <a href=${imageData.url}>
            <button
              class="btn container__description-container__text-container__title-container__download-button"
            >
              <i class="fas fa-download" />
            </button>
          </a>
        </div>
        <div class="container__description-container__text-container__source">
          <a href="http://${imageData.domain}">
            ${imageData.domain}
          </a>
        </div>
        <div class="container__description-container__text-container__author">
          <a href="http://reddit.com/user/${imageData.author}">
            ${imageData.author}
          </a>
        </div>
      </div>
    </div>
  `;
}
