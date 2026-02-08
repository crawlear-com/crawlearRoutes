const YOTUBE_PATTERN = /^.*(youtube.com|youtu.be)\/(watch\?v=|embed\/|v\/|shorts\/|)(.*?((?=[&#?])|$))/;
const getVideoIdFromYoutubeUrl = (url: string) => {
  const match = url.match(YOTUBE_PATTERN);

  if (match && match[3].length === 11) {
      return match[3];
  } else {
      return;
  }
}

export { YOTUBE_PATTERN, getVideoIdFromYoutubeUrl };