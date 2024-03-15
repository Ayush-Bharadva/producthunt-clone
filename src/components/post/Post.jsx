import { PropTypes } from "prop-types";
import Modal from "../modal/Modal";
import "./Post.scss";

const Post = ({ imgSrc }) => {
  return (
    <Modal>
      <div className="post-container">
        <div className="post-meta-info">
          <div className="post-image">
            <img src={imgSrc} alt="post image" />
          </div>
          <div className="post-heading">
            <div className="title">
              <h2>Fine</h2>
              <p>AI-powered devs</p>
            </div>
            <div className="actions">
              <button type="button" className="post-visit-btn">Visit</button>
              <button type="button" className="post-upvote-btn">UPVOTE 156</button>
            </div>
          </div>
          <div className="post-description">
            <div className="description-heading">
              <p>Free Options</p>
              <p>Fine&apos;s AI agents are software developers that never sleep. They understand business requirements, analyze your codebase, plan, generate code, and even test your app. Let them handle the tedious tasks and achieve your goals with unparalleled efficiency.</p>
            </div>
          </div>
          <div className="post-carousel"></div>
          <div className="post-comments"></div>
        </div>
      </div>
    </Modal>
  )
}

export default Post;

Post.propTypes = {
  imgSrc: PropTypes.string.isRequired
};