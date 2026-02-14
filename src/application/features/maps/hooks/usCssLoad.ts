
const useCssLoad = () => {
  const cssId = 'leafletCss';
if (!document.getElementById(cssId)) {
    const head  = document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.media = 'all';
    link.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";

    head.appendChild(link);
}
}

export default useCssLoad