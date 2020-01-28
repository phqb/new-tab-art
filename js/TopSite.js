function TopSite(props) {
  const [faviconLoaded, setFaviconLoaded] = React.useState(false);

  React.useState(() => {
    loadImageOnBackground(`chrome://favicon/${props.url}`, () =>
      setFaviconLoaded(true)
    );
  }, []);

  return html`
    <a href="${props.url}" class="topsite">
      <div class="topsite__favicon">
        ${faviconLoaded
          ? html`
              <img src="chrome://favicon/${props.url}" />
            `
          : html`
              <i class="fas fa-globe"></i>
            `}
      </div>
      <div class="topsite__title">
        ${props.title}
      </div>
    </a>
  `;
}
