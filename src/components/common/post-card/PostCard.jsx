import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { RiShareForward2Fill } from 'react-icons/ri';
import './PostCard.scss';

const PostCard = ({ post }) => {

  const { topics: { edges } } = post;

  return (
    <div key={post.id} className="post-card">
      <div className="product-image">
        <img src={post?.thumbnail?.url} alt={post.name} />
      </div>
      <div className="product-details">
        <div>
          <span className="product-name">{post.name}</span>
          <span className="product-tagline"> — {post.tagline}</span>
          <RiShareForward2Fill className="share-icon" />
        </div>
        <div className="product-other-details">
          <div className="comment flex-center">
            <FaRegComment />
            <p>{post.commentsCount}</p>
          </div>
          <div className="topics">
            {edges.map((topic, index) => {
              return (
                <Fragment key={`${topic}-${index}`}>
                  <span>•</span>
                  <span className="topic" key={topic.node.name}>{topic.node.name}</span>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
      <button className="up-vote-button">
        <div className="up-vote">
          <IoTriangle />
          <p>{post.votesCount}</p>
        </div>
      </button>
    </div>
  )
}

export default PostCard;

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};