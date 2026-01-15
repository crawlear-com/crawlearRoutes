import type { YoutubeEmbedProps } from './YoutubeEmbed.types';
import { YOTUBE_PATTERN } from '../../helpers/utils';

const getVideoId = (url: string) => {
  const match = url.match(YOTUBE_PATTERN);

  if (match && match[3].length === 11) {
      return match[3];
  } else {
      return;
  }
}

function YoutubeEmbed({ url, className }: YoutubeEmbedProps) {
    const videoId = getVideoId(url)

    if (videoId) {
      return <div className={ className ? className : '' }>
              <iframe src={`https://www.youtube.com/embed/${videoId}`} 
                  className="w-full min-h-96"
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
          </div>
    } else {
      return <></>;
    }
}

export default YoutubeEmbed;