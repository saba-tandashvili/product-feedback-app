import "./details.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import ArrowUp from "../assets/shared/icon-arrow-up.svg";
import ArrowWhite from "../assets/shared/icon-arrow-up-white.svg";
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import Comments from "../assets/shared/icon-comments.svg";
import type { Product } from "../types";

type DetailsProps = {
  products: Product[];
  handleUpvote: (id: number) => void;
  handleAddComment: (productId: number, content: string) => void;
  handleAddReply: (
    productId: number,
    commentId: number,
    content: string,
    replyingTo: string,
  ) => void;
};

export default function Details({
  products,
  handleUpvote,
  handleAddComment,
  handleAddReply,
}: DetailsProps) {
  const { id } = useParams();

  const product = products.find((p) => p.id.toString() === id) || products[0];

  const [characters, setCharacters] = useState(250);
  const [commentText, setCommentText] = useState("");

  const [activeReply, setActiveReply] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState("");

  return (
    <div className="details-whole">
      <header>
        <Link to="/" className="back">
          <img src={ArrowLeft} alt="" /> Go Back
        </Link>

        <Link to={`/product/${id}/edit`}>
          <button>Edit Feedback</button>
        </Link>
      </header>

      <div className="details-product">
        <div className="details-product-left">
          <div
            className="votes"
            onClick={() => handleUpvote(product.id)}
            style={{ backgroundColor: product.upvoted ? "#4661E6" : "" }}
          >
            <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
            <p style={{ color: product.upvoted ? "white" : "" }}>
              {product.upvotes}
            </p>
          </div>

          <div className="description">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="category">
              <span>{product.category}</span>
            </div>
          </div>
        </div>

        <div
          className="details-product-right"
          style={{
            opacity: product.comments?.length === undefined ? "50%" : "",
          }}
        >
          <div
            className="details-votes-mob"
            onClick={() => handleUpvote(product.id)}
            style={{ backgroundColor: product.upvoted ? "#4661E6" : "" }}
          >
            <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
            <p style={{ color: product.upvoted ? "white" : "" }}>
              {product.upvotes}
            </p>
          </div>

          <div className="comment">
            <img src={Comments} alt="" />
            <p>
              {product.comments ? product.comments.reduce((acc, comment) => acc + 1 + (comment.replies?.length || 0), 0) : 0}
            </p>
          </div>
        </div>
      </div>

      <div className="comments-div">
        <h1>{product.comments?.length} Comments</h1>
        {product.comments?.map((comment) => (
          <div className="comment-div" key={comment.id}>
            <div className="comment">
              <div className="comment-left">
                <img src={comment.user.image} alt="" />
              </div>
              <div className="comment-right">
                <div className="top">
                  <div className="name">
                    <p>{comment.user.name}</p>
                    <span>@{comment.user.username}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (activeReply === comment.id) {
                        setActiveReply(null);
                        setReplyText("");
                        setReplyingTo("");
                        return;
                      }

                      setActiveReply(comment.id);
                      setReplyingTo(comment.user.username);
                      setReplyText(`@${comment.user.username} `);
                    }}
                  >
                    reply
                  </button>
                </div>
                <p className="content">{comment.content}</p>
              </div>
            </div>
            {activeReply === comment.id && (
              <div className="add-reply">
                <textarea
                  placeholder="Type your reply"
                  onChange={(e) => setReplyText(e.target.value)}
                >
                  {replyText}
                </textarea>
                <button
                  className="post-reply"
                  onClick={() => {
                    if (!replyText.trim()) return;

                    handleAddReply(
                      product.id,
                      comment.id,
                      replyText.replace(`@${replyingTo} `, ""),
                      replyingTo,
                    );

                    setReplyText("");
                    setReplyingTo("");
                    setActiveReply(null);
                  }}
                >
                  Post Reply
                </button>
              </div>
            )}
            <div className="reply">
              {comment.replies?.map((reply) => (
                <div key={reply.id}>
                  <div className="comment">
                    <div className="comment-left">
                      <img src={reply.user.image} alt="" />
                    </div>

                    <div className="comment-right">
                      <div className="top">
                        <div className="name">
                          <p>{reply.user.name}</p>
                          <span>@{reply.user.username}</span>
                        </div>

                        <button
                          onClick={() => {
                            if (activeReply === reply.id) {
                              setActiveReply(null);
                              setReplyText("");
                              setReplyingTo("");
                              return;
                            }

                            setActiveReply(reply.id);
                            setReplyingTo(reply.user.username);
                            setReplyText(`@${reply.user.username} `);
                          }}
                        >
                          reply
                        </button>
                      </div>

                      <p className="content">
                        <span>@{reply.replyingTo} </span>
                        {reply.content}
                      </p>
                    </div>
                  </div>

                  {activeReply === reply.id && (
                    <div className="add-reply">
                      <textarea onChange={(e) => setReplyText(e.target.value)}>
                        {replyText}
                      </textarea>

                      <button
                        className="post-reply"
                        onClick={() => {
                          if (!replyText.trim()) return;

                          handleAddReply(
                            product.id,
                            comment.id,
                            replyText.replace(`@${replyingTo} `, ""),
                            replyingTo,
                          );

                          setReplyText("");
                          setReplyingTo("");
                          setActiveReply(null);
                        }}
                      >
                        Post Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="add-comment">
        <h1>Add Comment</h1>
        <input
          type="text"
          placeholder="Type your comment here"
          maxLength={250}
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
            setCharacters(250 - e.target.value.length);
          }}
        />
        <div className="bottom">
          <p>{characters} Characters left</p>
          <button
            onClick={() => {
              if (!commentText.trim()) return;

              handleAddComment(product.id, commentText);
              setCommentText("");
              setCharacters(250);
            }}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
