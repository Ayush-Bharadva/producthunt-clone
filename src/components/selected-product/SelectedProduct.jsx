import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { IoTriangle } from "react-icons/io5";
import Modal from "../modal/Modal";
import "./SelectedProduct.scss";
import Carousel from "../common/carousel/Carousel";
import ProductComments from "../common/comment-section/ProductComments";

const SelectedProduct = ({ product, closeModal }) => {

  const { name = "", tagline = "", website = "", votesCount = "", description = "", media: mediaList = [], thumbnail: { url: imgSrc = "" } } = product ?? {};

  console.log("product :", product);

  return (
    <Modal closeModal={closeModal} >
      <div className="product-container">
        <div className="product-meta-info">
          <div className="product-image">
            <img src={imgSrc} alt="product image" />
          </div>
          <div className="product-heading">
            <div className="title">
              <h2>{name}</h2>
              <p>{tagline}</p>
            </div>
            <div className="actions">
              <Link to={website} target="_blank" className="product-visit-btn">
                Visit
              </Link>
              <button type="button" className="product-up-vote-btn">
                <IoTriangle />
                <span>UPVOTE {votesCount}</span>
              </button>
            </div>
          </div>
          <div className="product-description">
            <div className="description-heading">
              <p>Free Options</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <Carousel mediaList={mediaList} />
        <ProductComments product={product} />
      </div>
    </Modal>
  );
};

export default SelectedProduct;

SelectedProduct.propTypes = {
  product: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};