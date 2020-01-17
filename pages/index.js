/* eslint-disable react/no-array-index-key */
import gql from 'graphql-tag';
import { RichText } from 'prismic-reactjs';
import usePrismicQuery from '../lib/apollo-client/usePrismicQuery';

const GET_RESOURCES_PAGE = gql`
  query GetResourcesPage {
    resources(uid: "resources-page", lang: "en-us") {
      video_title
      videos {
        embed
      }
      downloads_title
      downloads {
        download {
          ... on _FileLink {
            url
            name
          }
        }
      }
    }
  }
`;

const Index = () => {
  const { data, loading } = usePrismicQuery(GET_RESOURCES_PAGE);

  if (loading || !data) return null;

  return (
    <div>
      <VideosSection data={data} />
      <DownloadsSection data={data} />
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const VideosSection = ({ data }) => (
  <div>
    <RichText render={data.resources.video_title} />
    {data.resources.videos.map((video) => {
      const videoId = _extractVideoId(video.embed.embed_url);
      return (
        <div key={videoId}>{`videoId: ${videoId}`}</div>
      );
    })}
  </div>
);

function _extractVideoId(embedUrl) {
  return embedUrl.replace('https://youtu.be/', '');
}

// eslint-disable-next-line react/prop-types
const DownloadsSection = ({ data }) => (
  <div>
    <RichText render={data.resources.downloads_title} />
    {data.resources.downloads.map((download, i) => (
      <div key={i}>
        <a href={download.download.url} target="_blank" rel="noopener noreferrer">{download.download.name}</a>
      </div>
    ))}
  </div>
);

export default Index;
