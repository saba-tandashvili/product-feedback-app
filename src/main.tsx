import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Data from "./data.json";
import type { Product } from "./types";
import Main from "./components/Main.tsx";
import Details from "./components/Details.tsx";
import New from "./components/New.tsx";
import Edit from "./components/Edit.tsx";
import Roadmap from "./components/Roadmap.tsx";

export function AppWrapper() {
  const [products, setProducts] = useState<Product[]>(
    Data.productRequests.map((item) => ({
      ...item,
      upvoted: false,
      comments: item.comments?.map((comment) => ({
        ...comment,
        replies: comment.replies?.map((reply) => ({
          ...reply,
          id: Date.now() + Math.random(),
        })),
      })),
    })),
  );

  const handleUpvote = (id: number) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            upvoted: !item.upvoted,
            upvotes: item.upvoted ? item.upvotes - 1 : item.upvotes + 1,
          };
        }
        return item;
      }),
    );
  };

  const handleAddComment = (productId: number, content: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== productId) return product;

        const newComment = {
          id: Date.now(),
          content,
          user: {
            image: Data.currentUser.image,
            name: Data.currentUser.name,
            username: Data.currentUser.username,
          },
          replies: [],
        };

        return {
          ...product,
          comments: product.comments
            ? [...product.comments, newComment]
            : [newComment],
        };
      }),
    );
  };

  const handleAddReply = (
    productId: number,
    commentId: number,
    content: string,
    replyingTo: string,
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== productId) return product;

        const newReply = {
          id: Date.now(),
          content,
          replyingTo,
          user: {
            image: Data.currentUser.image,
            name: Data.currentUser.name,
            username: Data.currentUser.username,
          },
        };

        return {
          ...product,
          comments: (product.comments || []).map((comment) => {
            if (comment.id !== commentId) return comment;

            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }),
        };
      }),
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main products={products} handleUpvote={handleUpvote} />,
    },
    {
      path: "/product/:id",
      element: (
        <Details
          products={products}
          handleUpvote={handleUpvote}
          handleAddComment={handleAddComment}
          handleAddReply={handleAddReply}
        />
      ),
    },
    {
      path: "/product/new",
      element: <New setProducts={setProducts}/>,
    },
    {
      path: "/product/:id/edit",
      element: <Edit products={products} setProducts={setProducts} />,
    },
    {
      path: "/roadmap",
      element: <Roadmap products={products} handleUpvote={handleUpvote}/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(<AppWrapper />);
