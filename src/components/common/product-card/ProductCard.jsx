import { Fragment } from "react";
import PropTypes from "prop-types";
import { FaRegComment } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { RiShareForward2Fill } from "react-icons/ri";
import "./ProductCard.scss";
import SelectedProduct from "../../selected-product/SelectedProduct";
import { useModal } from "../../../hooks/useModal";

const ProductCard = ({ product }) => {

  const { isModalOpen, toggleModal } = useModal();
  const { topics: { edges = [] } = {} } = product ?? {};

  return (
    <>
      <div key={product.id} className="product-card" onClick={toggleModal}>
        <div className="product-image">
          <img src={product?.thumbnail?.url} alt={product.name} />
        </div>
        <div className="product-details">
          <div>
            <span className="product-name">{product.name}</span>
            <span className="product-tagline"> — {product.tagline}<RiShareForward2Fill className="share-icon" /></span>
          </div>
          <div className="product-other-details">
            <div className="comment flex-center">
              <FaRegComment />
              <p>{product.commentsCount}</p>
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
        <button className={`up-vote-button ${product.isVoted ? "voted-product" : ""}`}>
          <div className="up-vote">
            <IoTriangle className="triangle-icon" />
            <p>{product.votesCount}</p>
          </div>
        </button>
      </div>
      {isModalOpen ?
        <SelectedProduct
          product={product}
          closeModal={toggleModal}
        /> : null}
    </>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};