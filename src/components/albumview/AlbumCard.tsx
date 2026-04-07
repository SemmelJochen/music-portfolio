import './AlbumCard.css';

export interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  external_urls: { spotify: string };
  images: { url: string; height: number; width: number }[];
}

interface Props {
  album: SpotifyAlbum;
}

function embedLink(link: string) {
  return link.replace('/album', '/embed/album');
}

export default function AlbumCard({ album }: Props) {
  const { name, id, release_date, external_urls, images } = album;
  const year = new Date(release_date).getFullYear();

  return (
    <div className="w-[340px] grid items-start content-start gap-3 p-2">
      <div
        key={id}
        className="album-card relative w-[320px] h-[320px] rounded-lg overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <div className="album-card-inner relative w-full h-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }}>
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-lg backface-hidden"
            alt={name}
            src={images[0]?.url}
          />
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg border-0 backface-hidden"
            title={`${name} player`}
            src={embedLink(external_urls.spotify)}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
            allow="encrypted-media"
          />
        </div>
      </div>
      <div className="px-1">
        <a
          href={external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary dark:text-primary-dark font-bold text-lg hover:underline"
        >
          {name}
        </a>
        <p className="text-black dark:text-white text-sm mt-1">
          {!isNaN(year) ? year : 'No date available'}
        </p>
      </div>
    </div>
  );
}
