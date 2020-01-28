function TopSites() {
  const [topSites, setTopSites] = React.useState([]);

  React.useEffect(() => {
    MicroModal.init();

    if (typeof chrome !== 'undefined' && chrome.topSites) {
      chrome.topSites.get(sites => setTopSites(sites));
    }
  }, []);

  return html`
    <div class="modal micromodal-slide" id="topsites-modal" aria-hidden="true">
      <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div
          class="modal__container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-1-title"
          style=${{ minWidth: '800px' }}
        >
          <header class="modal__header">
            <h2 class="modal__title" id="modal-1-title">Top sites</h2>
            <button
              class="btn"
              onClick=${() => MicroModal.close('topsites-modal')}
              style=${{ marginLeft: '16px' }}
            >
              <i class="btn fas fa-times" style=${{ fontSize: '24px' }} />
            </button>
          </header>
          <main class="modal__content topsites" id="modal-1-content">
            ${topSites.map(
              site =>
                html`
                  <${TopSite} url=${site.url} title=${site.title} />
                `
            )}
          </main>
        </div>
      </div>
    </div>
  `;
}
