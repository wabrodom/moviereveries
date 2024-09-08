import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share'

import './ShareButtons.css'
import CopyUrl from '../CopyUrl'

const ShareButtons = ({ shareUrl, title }) => {

  return (
    <div className='container'>

      <div className="some-network">
        <FacebookShareButton url={shareUrl} className="some-network__share-button">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div className="some-network">
        <FacebookMessengerShareButton
          url={shareUrl}
          appId="521270401588372"
          className="some-network__share-button"
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>

      <div className="some-network">
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="some-network__share-button"
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className="some-network">
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="some-network__share-button"
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>


      <div className="some-network">
        <LineShareButton url={shareUrl} title={title} className="some-network__share-button">
          <LineIcon size={32} round />
        </LineShareButton>
      </div>

      <CopyUrl />

    </div>
  )
}

export default ShareButtons