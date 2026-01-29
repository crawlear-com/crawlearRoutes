import { getVideoIdFromYoutubeUrl } from './helpers/utils';
import type { YoutubeEmbedProps } from './YoutubeEmbed.types';

function YoutubeEmbed({ url, className }: YoutubeEmbedProps) {
    const videoId = getVideoIdFromYoutubeUrl(url)
      
    return (<>
      { videoId ? <div className={ className ? className : '' }>
            <iframe src={`https://www.youtube.com/embed/${videoId}`} 
                className="w-full min-h-96"
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </div> : <></> }
    </>);
}

export default YoutubeEmbed;