import "./roadmap.css";
import { Link } from "react-router-dom";
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import ArrowUp from "../assets/shared/icon-arrow-up.svg";
import ArrowWhite from "../assets/shared/icon-arrow-up-white.svg";
import Comment from "../assets/shared/icon-comments.svg";
import type { Product } from "../types";

type RoadmapProps = {
  products: Product[];
  handleUpvote: (id: number) => void;
};

export default function Roadmap({ products, handleUpvote }: RoadmapProps) {
  return (
    <div className="roadmap-whole">
      <header>
        <div className="left">
          <Link to={`/`} className="back">
            <img src={ArrowLeft} alt="" /> Go Back
          </Link>
          <h2>Roadmap</h2>
        </div>

        <button>+ Add Feedback</button>
      </header>

      <div className="roadmap-container">
        <div className="left">
          <div className="details">
            <h2>Planned (2)</h2>
            <p>Ideas prioritized for research</p>
          </div>

          {products.slice(6, 8).map((product) => {
            return (
              <div className="roadmap">
                <div className="state">
                  <div className="planned"></div>
                  <p>Planned</p>
                </div>

                <div className="info">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <button className="category">{product.category}</button>
                </div>

                <div className="bottom">
                  <div className="upvotes" onClick={() => handleUpvote(product.id)} style={{backgroundColor: product.upvoted ? "#4661E6" : ""}}>
                    <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
                    <p style={{color: product.upvoted ? "white" : ""}}>{product.upvotes}</p>
                  </div>

                  <div
                    className="comments"
                    style={{
                      opacity:
                        product.comments?.length === undefined ? "50%" : "",
                    }}
                  >
                    <img src={Comment} alt="" />
                    <p>
                      {product.comments?.length === undefined
                        ? "0"
                        : product.comments?.length}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="middle">
            <div className="details">
            <h2>In Progress (3)</h2>
            <p>Ideas prioritized for research</p>
          </div>

          {products.slice(8, 11).map((product) => {
            return (
              <div className="roadmap">
                <div className="state">
                  <div className="planned"></div>
                  <p>In Progress</p>
                </div>

                <div className="info">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <button className="category">{product.category}</button>
                </div>

                <div className="bottom">
                  <div className="upvotes" onClick={() => handleUpvote(product.id)} style={{backgroundColor: product.upvoted ? "#4661E6" : ""}}>
                    <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
                    <p style={{color: product.upvoted ? "white" : ""}}>{product.upvotes}</p>
                  </div>

                  <div
                    className="comments"
                    style={{
                      opacity:
                        product.comments?.length === undefined ? "50%" : "",
                    }}
                  >
                    <img src={Comment} alt="" />
                    <p>
                      {product.comments?.length === undefined
                        ? "0"
                        : product.comments?.length}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="right">
            <div className="details">
            <h2>Live (1)</h2>
            <p>Ideas prioritized for research</p>
          </div>

          {products.slice(11, 12).map((product) => {
            return (
              <div className="roadmap">
                <div className="state">
                  <div className="planned"></div>
                  <p>Live</p>
                </div>

                <div className="info">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <button className="category">{product.category}</button>
                </div>

                <div className="bottom">
                  <div className="upvotes" onClick={() => handleUpvote(product.id)} style={{backgroundColor: product.upvoted ? "#4661E6" : ""}}>
                    <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
                    <p style={{color: product.upvoted ? "white" : ""}}>{product.upvotes}</p>
                  </div>

                  <div
                    className="comments"
                    style={{
                      opacity:
                        product.comments?.length === undefined ? "50%" : "",
                    }}
                  >
                    <img src={Comment} alt="" />
                    <p>
                      {product.comments?.length === undefined
                        ? "0"
                        : product.comments?.length}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
