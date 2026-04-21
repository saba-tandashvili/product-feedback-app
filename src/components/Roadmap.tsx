import "./roadmap.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [selection, setSelection] = useState("planned");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      <div className="switch">
        <div
          className="planned"
          onClick={() => {
            setSelection("planned");
          }}
        >
          <h3 className={selection === "planned" ? "active-selection" : ""}>
            Planned (2)
          </h3>
          <div style={{display: selection === "planned" ? "" : "none"}}></div>
        </div>
        <div
          className="in-progress"
          onClick={() => {
            setSelection("in-progress");
          }}
        >
          <h3 className={selection === "in-progress" ? "active-selection" : ""}>
            In Progress (3)
          </h3>
          <div style={{display: selection === "in-progress" ? "" : "none"}}></div>
        </div>
        <div
          className="live"
          onClick={() => {
            setSelection("live");
          }}
        >
          <h3 className={selection === "live" ? "active-selection" : ""}>
            Live (1)
          </h3>
          <div style={{display: selection === "live" ? "" : "none"}}></div>
        </div>
      </div>

      <div className="roadmap-container">
        <div
          className="left"
          style={{
            display: width >= 1160 || selection === "planned" ? "" : "none",
          }}
        >
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
                  <div
                    className="upvotes"
                    onClick={() => handleUpvote(product.id)}
                    style={{
                      backgroundColor: product.upvoted ? "#4661E6" : "",
                    }}
                  >
                    <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
                    <p style={{ color: product.upvoted ? "white" : "" }}>
                      {product.upvotes}
                    </p>
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
        <div
          className="middle"
          style={{
            display: width >= 1160 || selection === "in-progress" ? "" : "none",
          }}
        >
          <div className="details">
            <h2>In Progress (3)</h2>
            <p>Currently beeing developed</p>
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
                  <div
                    className="upvotes"
                    onClick={() => handleUpvote(product.id)}
                    style={{
                      backgroundColor: product.upvoted ? "#4661E6" : "",
                    }}
                  >
                    <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
                    <p style={{ color: product.upvoted ? "white" : "" }}>
                      {product.upvotes}
                    </p>
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
        <div
          className="right"
          style={{
            display: width >= 1160 || selection === "live" ? "" : "none",
          }}
        >
          <div className="details">
            <h2>Live (1)</h2>
            <p>Released features</p>
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
                  <div
                    className="upvotes"
                    onClick={() => handleUpvote(product.id)}
                    style={{
                      backgroundColor: product.upvoted ? "#4661E6" : "",
                    }}
                  >
                    <img src={product.upvoted ? ArrowWhite : ArrowUp} alt="" />
                    <p style={{ color: product.upvoted ? "white" : "" }}>
                      {product.upvotes}
                    </p>
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
