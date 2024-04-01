import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { RiShareForward2Fill } from 'react-icons/ri';
import './ProductCard.scss';
import SelectedProduct from '../../selected-product/SelectedProduct';
import { useModal } from '../../../hooks/useModal';

const ProductCard = ({ post }) => {

  const { isModalOpen, toggleModal } = useModal();
  const { topics: { edges = [] } = {} } = post ?? {};

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
                );
              })}
            </div>
          </div>
        </div>
        <button className={`up-vote-button ${post.isVoted ? "voted-product" : ""}`}>
          <div className="up-vote">
            <IoTriangle className="triangle-icon" />
            <p>{post.votesCount}</p>
          </div>
        </button>
      </div>
      {isModalOpen ?
        <SelectedProduct
          post={post}
          imgSrc={post.thumbnail.url}
          closeModal={toggleModal}
          mediaList={post.media}
        /> : null}
    </>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  post: PropTypes.object.isRequired,
};