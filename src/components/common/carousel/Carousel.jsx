import { PropTypes } from "prop-types";
import "./Carousel.scss";
import { useCallback, useRef } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Carousel = ({ mediaList }) => {

  const carouselRef = useRef(null);

  const handleCarousalScroll = useCallback((dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += (dir * carouselRef.current.clientWidth);
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
            <div className="media-wrapper" key={media.url}>
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
};

export default Carousel;

Carousel.propTypes = {
  mediaList: PropTypes.array.isRequired
};