import { PropTypes } from "prop-types";
import "./PostCarousel.scss";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useRef } from "react";

const PostCarousel = ({ mediaList }) => {

  const carouselRef = useRef(null);

  const handleCarousalScroll = (scrollWidth) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollWidth;
    }
  };

  const scrollLeft = () => {
    handleCarousalScroll(-350);
  };
  const scrollRight = () => {
    handleCarousalScroll(350);
  };

  return (
    <div className="carousel-wrapper">
      <div onClick={scrollLeft}>
        <HiOutlineArrowLeftCircle className="left-arrow" />
      </div>
      <div className="post-carousel" ref={carouselRef}>
        {mediaList.map(media => {
          return <div className="media-wrapper" key={media.url}>
            <img className="media" src={media.url} loading="lazy" />
          </div>
        })}
      </div>
      <div onClick={scrollRight}>
        <HiOutlineArrowCircleRight className="right-arrow" />
      </div>
    </div>
  );
}

export default PostCarousel;

PostCarousel.propTypes = {
  mediaList: PropTypes.array.isRequired
};