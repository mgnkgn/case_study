import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainContext } from "@/context/main-context";
import BackspaceIcon from "@mui/icons-material/Backspace";

const CardInfo = () => {
  const { posts, selectedId, setPosts } = useContext(MainContext);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [selectedId]);

  const relatedPost = posts.find((post) => post.id === selectedId);

  const deleteHandler = () => {
    const newPosts = posts.filter((post) => post.id !== selectedId);
    setPosts(newPosts);
    const deletePost = async (postId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${postId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        console.log("Post deleted successfully");
      } catch (error) {
        console.error(error);
      }
    };
    deletePost(selectedId);
  };

  const imgErrorHandler = () => {
    setImageError(true);
  };

  return (
    <div className="card-info">
      {relatedPost && (
        <>
          <AnimatePresence mode="wait">
            <motion.h2
              key={selectedId === relatedPost.id ? selectedId : ""}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h2-info mt-5"
            >
              {" "}
              {relatedPost?.title}
              <span className="del-icon mr-5" onClick={deleteHandler}>
                <BackspaceIcon />
              </span>
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedId === relatedPost.id ? selectedId : ""}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-info"
            >
              {relatedPost?.description}
            </motion.p>
          </AnimatePresence>
          {!imageError ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedId === relatedPost.id ? selectedId : ""}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={relatedPost?.imgurl}
                className="img-info"
                onError={imgErrorHandler}
              />
            </AnimatePresence>
          ) : (
            <p className="err-msg">Error loading image. Try refreshing page.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CardInfo;
