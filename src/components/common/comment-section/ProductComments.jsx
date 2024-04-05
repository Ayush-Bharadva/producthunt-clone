import { PropTypes } from "prop-types";
import UserAvatar from "../../../assets/images/user-avatar.jpg";
import "./ProductComments.scss";

const parseComment = (comment) => {
  const doc = new DOMParser().parseFromString(comment, "text/html");
  return doc.body.textContent;
};

const ProductComments = ({ product }) => {

  const { nodes: productComments, totalCount } = product?.comments ?? {};
  console.log("productComments :", productComments, totalCount);

  return (
    <div className="product-comments">
      {productComments?.map(({ id, body, isVoted, votesCount }) => {

        const parsedBody = parseComment(body);

        return (
          <div className="comment" key={id}>
            <div className="commented-user-image">
              <img src={UserAvatar} alt="user-avatar" />
              <div className="border-vertical"></div>
            </div>
            <div className="comment-info">
              <div className="commented-user-info">
                <p className="profile-name">Profile Name</p>
                <p className="user-name">username</p>
              </div>
              <div className="comment-body">
                {parsedBody}
              </div>
              <div className="comment-stats">
                <button className={isVoted ? "comment-up-vote-btn voted" : "comment-up-vote-btn"}>
                  <span>Upvote</span>
                  <span>({votesCount})</span>
                </button>
                <button className="reply-btn text-btn">Reply</button>
                <button className="share-btn text-btn">Share</button>
                <button className="report-btn text-btn">Report</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductComments;

ProductComments.propTypes = {
  product: PropTypes.object
};