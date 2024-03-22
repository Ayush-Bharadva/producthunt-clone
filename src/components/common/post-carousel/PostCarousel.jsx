import { PropTypes } from "prop-types";
import "./PostCarousel.scss";
import { useRef } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const PostCarousel = ({ mediaList }) => {

  const carouselRef = useRef(null);
  const carouselImageRef = useRef(null);

  const handleCarousalScroll = (dir) => {
    if (carouselRef.current && carouselImageRef.current) {
      carouselRef.current.scrollLeft += (dir * carouselImageRef.current.scrollWidth);
    }
  };

  const scrollLeft = () => {
    handleCarousalScroll(-1);
  };
  const scrollRight = () => {
    handleCarousalScroll(1);
  };

  return (
    <div className="carousel-wrapper">
      <div onClick={scrollLeft} className="left-arrow">
        <IoArrowBackCircleOutline />
      </div>
      <div className="post-carousel" ref={carouselRef}>
        {mediaList.map(media => {
          return (
            <div className="media-wrapper" key={media.url}>
              <img ref={carouselImageRef} className="media" src={media.url} />
            </div>
          );
        })}
      </div>
      <div onClick={scrollRight} className="right-arrow">
        <IoArrowForwardCircleOutline />
      </div>
    </div>
  );
}

export default PostCarousel;

PostCarousel.propTypes = {
  mediaList: PropTypes.array.isRequired
};