import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import "./SelectedProduct.scss";
import Carousel from "../common/carousel/Carousel";

const SelectedProduct = ({ post, imgSrc, mediaList, closeModal }) => {
  return (
    <Modal closeModal={closeModal} >
      <div className="post-container">
        <div className="post-meta-info">
          <div className="post-image">
            <img src={imgSrc} alt="post image" />
          </div>
          <div className="post-heading">
            <div className="title">
              <h2>{post.name}</h2>
              <p>{post.tagline}</p>
            </div>
            <div className="actions">
              <Link to={post.website} target="_blank" className="post-visit-btn">
                Visit
              </Link>
              <button type="button" className="post-upvote-btn">UPVOTE {post.votesCount}</button>
            </div>
          </div>
          <div className="post-description">
            <div className="description-heading">
              <p>Free Options</p>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
        <Carousel mediaList={mediaList} />
        <div className="post-comments"></div>
      </div>
    </Modal>
  );
};

export default SelectedProduct;

SelectedProduct.propTypes = {
  post: PropTypes.object.isRequired,
  imgSrc: PropTypes.string.isRequired,
  mediaList: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
};