import { PropTypes } from "prop-types";
import "./PostCarousel.scss";
import { useCallback, useRef } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const PostCarousel = ({ mediaList }) => {

  const carouselRef = useRef(null);
  const carouselItemRef = useRef(null);

  const handleCarousalScroll = useCallback((dir) => {
    if (carouselRef.current && carouselItemRef.current) {
      carouselRef.current.scrollLeft += (dir * carouselItemRef.current.scrollWidth);
    }
  }, []);

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
            <div className="media-wrapper" key={media.url} ref={carouselItemRef}>
              <img className="media" src={media.url} />
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