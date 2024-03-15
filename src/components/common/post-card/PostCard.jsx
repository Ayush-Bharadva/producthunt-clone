import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { RiShareForward2Fill } from 'react-icons/ri';
import './PostCard.scss';
import Post from '../../post/Post';
import { useModal } from '../../../hooks/useModal';

const PostCard = ({ post }) => {

  const { isModalOpen, toggleModal } = useModal();

  const { topics: { edges } } = post;

  return (
    <>
      <div key={post.id} className="post-card" onClick={toggleModal}>
        <div className="product-image">
          <img src={post?.thumbnail?.url} alt={post.name} />
        </div>
        <div className="product-details">
          <div>
            <span className="product-name">{post.name}</span>
            <span className="product-tagline"> — {post.tagline}<RiShareForward2Fill className="share-icon" /></span>
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
      {isModalOpen ? <Post imgSrc={post.thumbnail.url} /> : null}
    </>
  )
}

export default PostCard;

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};