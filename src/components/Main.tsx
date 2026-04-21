import "./main.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Banner from "../assets/suggestions/desktop/background-header.png";
import Lightbulb from "../assets/suggestions/icon-suggestions.svg";
import ArrowDown from "../assets/shared/icon-arrow-down.svg";
import ArrowUp from "../assets/shared/icon-arrow-up.svg";
import ArrowWhite from "../assets/shared/icon-arrow-up-white.svg";
import Comments from "../assets/shared/icon-comments.svg";
import Empty from "../assets/suggestions/illustration-empty.svg";
import Check from "../assets/shared/icon-check.svg";
import Close from "../assets/shared/mobile/icon-close.svg";
import Hamburger from "../assets/shared/mobile/icon-hamburger.svg";
import type { Product } from "../types";

type MainProps = {
  products: Product[];
  handleUpvote: (id: number) => void;
};

export default function Main({ products, handleUpvote }: MainProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortShow, setSortShow] = useState(false);
  const [sort, setSort] = useState("Most Upvotes");
  const [show, setShow] = useState(false);

  const filteredSuggestions =
    activeFilter === "all"
      ? products.slice(0, 6)
      : products
          .slice(0, 6)
          .filter((item) => item.category.toLowerCase() === activeFilter);

  const sortedSuggestions = [...filteredSuggestions].sort((a, b) => {
    switch (sort) {
      case "Most Upvotes":
        return b.upvotes - a.upvotes;

      case "Least Upvotes":
        return a.upvotes - b.upvotes;

      case "Most Comments":
        return (b.comments?.length || 0) - (a.comments?.length || 0);

      case "Least Comments":
        return (a.comments?.length || 0) - (b.comments?.length || 0);

      default:
        return 0;
    }
  });

  const suggestions = sortedSuggestions.slice(0, 6);

  return (
    <div className="whole">
      <div className="left">
        <div className="banner">
          <div className="banner-left">
            <img src={Banner} />
            <h3>Frontend Mentor</h3>
            <p>Feedback board</p>
          </div>

          <div className="banner-right">
            <img
              src={Hamburger}
              alt=""
              onClick={() => {
                setShow(true);
              }}
              style={{ display: show ? "none" : "" }}
            />
            <img
              src={Close}
              alt=""
              onClick={() => {
                setShow(false);
              }}
              style={{ display: show ? "" : "none" }}
            />
          </div>
        </div>

        <div className="filters">
          <div className="top">
            <button
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "active" : ""}
              style={{ color: activeFilter === "all" ? "white" : "" }}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("ui")}
              className={activeFilter === "ui" ? "active" : ""}
              style={{ color: activeFilter === "ui" ? "white" : "" }}
            >
              UI
            </button>
            <button
              onClick={() => setActiveFilter("ux")}
              className={activeFilter === "ux" ? "active" : ""}
              style={{ color: activeFilter === "ux" ? "white" : "" }}
            >
              UX
            </button>
          </div>
          <div className="middle">
            <button
              onClick={() => setActiveFilter("enhancement")}
              className={activeFilter === "enhancement" ? "active" : ""}
              style={{ color: activeFilter === "enhancement" ? "white" : "" }}
            >
              Enhancement
            </button>
            <button
              onClick={() => setActiveFilter("bug")}
              className={activeFilter === "bug" ? "active" : ""}
              style={{ color: activeFilter === "bug" ? "white" : "" }}
            >
              Bug
            </button>
          </div>
          <div className="bottom">
            <button
              onClick={() => setActiveFilter("feature")}
              className={activeFilter === "feature" ? "active" : ""}
              style={{ color: activeFilter === "feature" ? "white" : "" }}
            >
              Feature
            </button>
          </div>
        </div>

        <div className="roadmap">
          <div className="top">
            <h3>Roadmap</h3>
            <Link to={"/roadmap"}>View</Link>
          </div>

          <div className="bottom">
            <div>
              <div>
                <div className="orange colors"></div>
                <p>Planned</p>
              </div>
              <h3>2</h3>
            </div>

            <div>
              <div>
                <div className="purple colors"></div>
                <p>In Progress</p>
              </div>
              <h3>3</h3>
            </div>

            <div>
              <div>
                <div className="cyan colors"></div>
                <p>Live</p>
              </div>
              <h3>1</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="show" style={{ display: show ? "" : "none" }}>
        <div className="black"></div>
        <div className="show-div">
          <div className="filters">
            <div className="top">
              <button
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "active" : ""}
                style={{ color: activeFilter === "all" ? "white" : "" }}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("ui")}
                className={activeFilter === "ui" ? "active" : ""}
                style={{ color: activeFilter === "ui" ? "white" : "" }}
              >
                UI
              </button>
              <button
                onClick={() => setActiveFilter("ux")}
                className={activeFilter === "ux" ? "active" : ""}
                style={{ color: activeFilter === "ux" ? "white" : "" }}
              >
                UX
              </button>
            </div>
            <div className="middle">
              <button
                onClick={() => setActiveFilter("enhancement")}
                className={activeFilter === "enhancement" ? "active" : ""}
                style={{ color: activeFilter === "enhancement" ? "white" : "" }}
              >
                Enhancement
              </button>
              <button
                onClick={() => setActiveFilter("bug")}
                className={activeFilter === "bug" ? "active" : ""}
                style={{ color: activeFilter === "bug" ? "white" : "" }}
              >
                Bug
              </button>
            </div>
            <div className="bottom">
              <button
                onClick={() => setActiveFilter("feature")}
                className={activeFilter === "feature" ? "active" : ""}
                style={{ color: activeFilter === "feature" ? "white" : "" }}
              >
                Feature
              </button>
            </div>
          </div>

          <div className="roadmap">
            <div className="top">
              <h3>Roadmap</h3>
              <Link to={"/roadmap"}>View</Link>
            </div>

            <div className="bottom">
              <div>
                <div>
                  <div className="orange colors"></div>
                  <p>Planned</p>
                </div>
                <h3>2</h3>
              </div>

              <div>
                <div>
                  <div className="purple colors"></div>
                  <p>In Progress</p>
                </div>
                <h3>3</h3>
              </div>

              <div>
                <div>
                  <div className="cyan colors"></div>
                  <p>Live</p>
                </div>
                <h3>1</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
        <header>
          <div className="left">
            <img src={Lightbulb} alt="" className="lightbulb" />
            <h3>{suggestions.length} Suggestions</h3>

            <p onClick={() => setSortShow(!sortShow)}>
              Sort by :{" "}
              <span>
                {sort} <img src={ArrowDown} alt="" />
              </span>
            </p>

            <div className="sort" style={{ display: sortShow ? "" : "none" }}>
              <p
                onClick={() => {
                  setSort("Most Upvotes");
                  setSortShow(false);
                }}
              >
                Most Upvotes
                <img
                  src={Check}
                  alt=""
                  style={{ display: sort === "Most Upvotes" ? "" : "none" }}
                />
              </p>
              <p
                onClick={() => {
                  setSort("Least Upvotes");
                  setSortShow(false);
                }}
              >
                Least Upvotes
                <img
                  src={Check}
                  alt=""
                  style={{ display: sort === "Least Upvotes" ? "" : "none" }}
                />
              </p>
              <p
                onClick={() => {
                  setSort("Most Comments");
                  setSortShow(false);
                }}
              >
                Most Comments
                <img
                  src={Check}
                  alt=""
                  style={{ display: sort === "Most Comments" ? "" : "none" }}
                />
              </p>
              <p
                onClick={() => {
                  setSort("Least Comments");
                  setSortShow(false);
                }}
              >
                Least Comments
                <img
                  src={Check}
                  alt=""
                  style={{ display: sort === "Least Comments" ? "" : "none" }}
                />
              </p>
            </div>
          </div>

          <Link to={"/product/new"}>
            <button>+ Add Feedback</button>
          </Link>
        </header>

        {suggestions.map((product) => (
          <div className="product">
            <div className="product-left">
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

              <Link to={`product/${product.id}`} key={product.id}>
                <div className="description">
                  <h1>{product.title}</h1>
                  <p>{product.description}</p>
                  <div className="category">
                    <span>{product.category}</span>
                  </div>
                </div>
              </Link>
            </div>

            <div
              className="product-right"
              style={{
                opacity: product.comments?.length === undefined ? "50%" : "",
              }}
            >
              <div
                className="votes-mob"
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
        ))}

        <div
          className="empty"
          style={{ display: suggestions.length === 0 ? "" : "none" }}
        >
          <img src={Empty} alt="" />
          <h3>There is no feedback yet.</h3>
          <p>
            Got a suggestion? Found a bug that needs to be squashed? We
            love hearing about new ideas to improve our app.
          </p>
          <Link to={"/product/new"}>
            <button>+ Add Feedback</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
