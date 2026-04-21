import "./edit.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/shared/icon-arrow-left.svg";
import ArrowDown from "../assets/shared/icon-arrow-down.svg";
import Editf from "../assets/shared/icon-edit-feedback.svg";
import Check from "../assets/shared/icon-check.svg";
import type { Product } from "../types";



export default function Edit({
  products,
  setProducts,
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const { id } = useParams();
  const feedback = products.find((p) => p.id.toString() === id) || products[0];

  const [title, setTitle] = useState(feedback.title);
  const [category, setCategory] = useState(feedback.category);
  const [detail, setDetail] = useState(feedback.description);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id.toString() === id
          ? {
              ...item,
              title,
              category,
              description: detail,
            }
          : item,
      ),
    );
    navigate(`/product/${id}`);
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((item) => item.id.toString() !== id));
    navigate("/");
  };

  return (
    <div className="edit-whole">
      <header>
        <Link to={`/product/${id}`} className="back">
          <img src={ArrowLeft} alt="" /> Go Back
        </Link>
      </header>

      <div className="edit-container">
        <img src={Editf} alt="" className="icon" />
        <h1>Editing '{title}' </h1>

        <div className="info">
          <h3>Feedback Title</h3>
          <p>Add a short, descriptive headline</p>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <div className="info">
          <h3>Category</h3>
          <p>Choose a category for your feedback</p>
        </div>

        <div className="category-div">
          <div
            className="category"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
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
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        ></textarea>

        <div className="buttons">
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
          <div className="right">
            <button className="cancel" onClick={() => {navigate(`/product/${id}`)}}>Cancel</button>
            <button className="add" onClick={handleSave}>
              Add Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
