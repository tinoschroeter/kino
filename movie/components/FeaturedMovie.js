import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://3.bp.blogspot.com/-EACluKag1GI/Vu_yOJyROhI/AAAAAAAAVwM/lOXKaVc_ONguPtSMWaaRidFPI2RIE1PMA/s1600/${src}?w=${width}&q=${quality || 75}`
}

const FeaturedMovie = () => {
  return (
    <div className="featured-movie">
      <Image
        loader={myLoader}
        className="cover"
        src="IMG_1057_ShiftN%2B%2528Andere%2529.jpg"
        alt="cover image"
        width={900}
        height={400}
      />
      <p className="corner-title">Saal 1</p>

      <div className="bottom-bar">
        <div className="title-container">
          Abaton Kino
        </div>

      </div>
    </div>
  );
};

export default FeaturedMovie;
