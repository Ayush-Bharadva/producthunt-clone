import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import "./SelectedPost.scss";
import PostCarousel from "../common/post-carousel/PostCarousel";

const SelectedPost = ({ post, imgSrc, mediaList, closeModal }) => {

  return (
    <Modal isOpen closeModal={closeModal} >
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
              <Link to={post.website} target="_blank" >
                <button type="button" className="post-visit-btn">
                  VISIT
                </button>
              </Link>
              <button type="button" className="post-upvote-btn">UPVOTE 156</button>
            </div>
          </div>
          <div className="post-description">
            <div className="description-heading">
              <p>Free Options</p>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
        <PostCarousel mediaList={mediaList} />
        <div className="post-comments"></div>
      </div>
    </Modal>
  )
}

export default SelectedPost;

SelectedPost.propTypes = {
  post: PropTypes.object.isRequired,
  imgSrc: PropTypes.string.isRequired,
  mediaList: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
};