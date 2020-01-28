function Settings() {
  const [changeArtworkMethod, setChangeArtWorkMethod] = React.useState(
    DEFAULT_SETTINGS.changeArtworkMethod
  );
  const [subreddits, setSubreddits] = React.useState(
    DEFAULT_SETTINGS.subreddits.join('\r\n')
  );

  function setArtworkChangingMethod(method) {
    setChangeArtWorkMethod(method);
    saveToStorage({ changeArtworkMethod: method });
  }

  function handleSubredditsChange(e) {
    setSubreddits(e.target.value);
    saveToStorage({
      subreddits: e.target.value
        .split(/\r?\n/)
        .map(e => e.trim())
        .filter(e => e.length > 0)
    });
  }

  React.useEffect(() => {
    MicroModal.init();

    getFromStorage('changeArtworkMethod', ({ changeArtworkMethod }) => {
      if (changeArtworkMethod) {
        setChangeArtWorkMethod(changeArtworkMethod);
      }
    });

    getFromStorage('subreddits', ({ subreddits }) => {
      if (subreddits) {
        setSubreddits(subreddits.join('\r\n'));
      }
    });
  }, []);

  return html`
    <div class="modal micromodal-slide" id="settings-modal" aria-hidden="true">
      <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div
          class="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-1-title"
        >
          <header class="modal__header">
            <h2 class="modal__title" id="modal-1-title">
              Settings
            </h2>
            <button
              class="btn"
              onClick=${() => MicroModal.close('settings-modal')}
              style=${{ marginLeft: '16px' }}
            >
              <i class="btn fas fa-times" style=${{ fontSize: '24px' }} />
            </button>
          </header>
          <main class="modal__content" id="modal-1-content">
            <h4>Change artwork</h4>
            <div style=${{ display: 'flex' }}>
              <div>
                <input
                  id="daily"
                  type="radio"
                  name="changeArtwork"
                  value="daily"
                  checked=${changeArtworkMethod === 'daily'}
                  onClick=${() => setArtworkChangingMethod('daily')}
                />
                <label for="daily">Daily</label>
              </div>
              <div style=${{ marginLeft: '8px' }}>
                <input
                  id="newtab"
                  type="radio"
                  name="changeArtwork"
                  value="newtab"
                  checked=${changeArtworkMethod === 'newtab'}
                  onClick=${() => setArtworkChangingMethod('newtab')}
                />
                <label for="newtab">In every new tab</label>
              </div>
            </div>
            <h4>Artwork sources</h4>
            <p>
              <small>Accept subreddits, one line each</small>
            </p>
            <textarea
              style=${{ width: '250px' }}
              rows="5"
              value=${subreddits}
              onChange=${handleSubredditsChange}
            ></textarea>
          </main>
        </div>
      </div>
    </div>
  `;
}
