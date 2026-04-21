import "./new.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../assets/shared/icon-arrow-down.svg";
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import Icon from "../assets/shared/icon-new-feedback.svg";
import Check from "../assets/shared/icon-check.svg";
import type { Product } from "../types";

export default function New({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("Feature");

  const handleCreate = () => {
    if (!title.trim() || !detail.trim()) return;

    const newFeedback = {
      id: Date.now(),
      title,
      category,
      description: detail,
      upvotes: 0,
      upvoted: false,
      status: "suggestion",
      comments: [],
    };

    setProducts((prev) => [newFeedback, ...prev]);

    navigate("/");
  };

  return (
    <div className="new-whole">
      <header>
        <Link to="/" className="back">
          <img src={ArrowLeft} alt="" /> Go Back
        </Link>
      </header>

      <div className="create-new-feedback">
        <img src={Icon} alt="" className="icon" />
        <h1>Create New Feedback</h1>

        <div className="info">
          <h3>Feedback Title</h3>
          <p>Add a short, descriptive headline</p>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="info">
          <h3>Category</h3>
          <p>Choose a category for your feedback</p>
        </div>

        <div className="category-div">
          <div className="category" onClick={() => setDropdown(!dropdown)}>
            <p>{category}</p>
            <img src={ArrowDown} alt="" />
          </div>
          <div className="dropdown" style={{ display: dropdown ? "" : "none" }}>
            <p
              onClick={() => {
                setCategory("Feature");
                setDropdown(false);
              }}
            >
              Feature{" "}
              <img
                src={Check}
                alt=""
                style={{ display: category === "Feature" ? "" : "none" }}
              />
            </p>
            <p
              onClick={() => {
                setCategory("UI");
                setDropdown(false);
              }}
            >
              UI{" "}
              <img
                src={Check}
                alt=""
                style={{ display: category === "UI" ? "" : "none" }}
              />
            </p>
            <p
              onClick={() => {
                setCategory("UX");
                setDropdown(false);
              }}
            >
              UX{" "}
              <img
                src={Check}
                alt=""
                style={{ display: category === "UX" ? "" : "none" }}
              />
            </p>
            <p
              onClick={() => {
                setCategory("Enhancement");
                setDropdown(false);
              }}
            >
              Enhancement{" "}
              <img
                src={Check}
                alt=""
                style={{ display: category === "Enhancement" ? "" : "none" }}
              />
            </p>
            <p
              onClick={() => {
                setCategory("Bug");
                setDropdown(false);
              }}
            >
              Bug{" "}
              <img
                src={Check}
                alt=""
                style={{ display: category === "Bug" ? "" : "none" }}
              />
            </p>
          </div>
        </div>

        <div className="info">
          <h3>Feedback Detail</h3>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
        </div>

        <textarea
          className="big-input"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>

        <div className="buttons">
          <button
            className="cancel"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button className="add" onClick={handleCreate}>
            Add Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
