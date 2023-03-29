import { MainContext } from "@/context/main-context";
import React, { useState, useEffect, useRef, useContext } from "react";
import { storage } from "../../context/firebase";
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const CardMain = (props) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [titleVal, setTitleVal] = useState("New Title");
  const [descriptionVal, setDescriptionVal] = useState("New Description");
  const [fileUpload, setFileUpload] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [image, setImage] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);
  const [myPost, setMyPost] = useState({
    Title: "",
    Description: "",
    Createdate: "",
    Imgurl: "",
  });

  const { posts, sendPost, setId, setPosts } = useContext(MainContext);
  const imageRef = ref(storage, "images/");

  // ******* custom functions for fetching *******
  async function fetchData(url, method, body) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!data) {
        console.error("No data has found");
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function fetchPosts() {
    const data = await fetchData("http://localhost:8080/api/posts", "GET");
    if (data) {
      setPosts(data);
    }
  }
  // *****custom functions for fetching*****

  useEffect(() => {
    titleRef.current.focus();

    fetchPosts();
  }, []);

  useEffect(() => {
    if (isFormSent) {
      console.log("xx");
      console.log(posts);
      setPosts(posts);
      setId(posts[-1]?.id);
      console.log(posts[-1]?.id);
    }
  }, [isFormSent]);

  useEffect(() => {
    if (fileUpload) {
      uploadMyImg();
    }
  }, [fileUpload]);

  const validateForm = () => {
    // regular input check
    const inputs = [titleVal, descriptionVal];
    const isValid = inputs.every((input) => input.length > 0);
    // file check
    const isValidTotal = fileUpload?.name && isValid;
    setIsFormValid(isValidTotal);
  };

  // Checking form is valid with validateForm function
  useEffect(() => {
    validateForm();
    if (
      titleVal === "New Title" &&
      descriptionVal === "New Description" &&
      fileUpload === null
    ) {
      setIsFormSent(false);
    }
  }, [titleVal, descriptionVal, fileUpload]);

  const uploadMyImg = () => {
    if (fileUpload === null) return;

    const fileRef = ref(storage, `images/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then((point) => {
      getDownloadURL(point.ref).then((url) => {
        setImage(url);
        // Preparing "createDate" property
        const options = {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
          timeZone: "Europe/Istanbul",
        };
        const formattedDate = new Date().toLocaleDateString("en-US", options);

        setMyPost((currentMyPost) => ({
          ...currentMyPost,
          Imgurl: url,
          Createdate: formattedDate.toString(),
        }));
      });

      // console.log("File uploaded");
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return null;
    }

    async function createPost() {
      try {
        const data = await fetchData(
          "http://localhost:8080/api/posts",
          "POST",
          myPost
        );
        // console.log("response:::", data);
      } catch (error) {
        console.error(error);
      }
    }
    createPost();
    sendPost(myPost);

    setTitleVal("New Title");
    setDescriptionVal("New Description");
    setFileUpload(null);
    setIsFormValid(false);
    setIsFormSent(true);
    fetchPosts();
  };

  return (
    <div className="card-main">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={titleVal}
          ref={titleRef}
          onLoad={(e) => e.target.select()}
          onChange={(e) => {
            setTitleVal(e.target.value);
            setMyPost((myCurrentPost) => ({
              ...myCurrentPost,
              Title: e.target.value,
            }));
          }}
          onFocus={(e) => e.target.select()}
        />
        <textarea
          type="text"
          ref={descriptionRef}
          value={descriptionVal}
          onChange={(e) => {
            setDescriptionVal(e.target.value);
            setMyPost((myCurrentPost) => ({
              ...myCurrentPost,
              Description: e.target.value,
            }));
          }}
          onFocus={(e) => e.target.select()}
        />
        {fileUpload ? (
          <img
            src={image.toString()}
            alt="my-image"
            className="img-info ml-5"
          />
        ) : (
          <>
            <label htmlFor="file" className="file-label">
              + <span>Görsel</span>
            </label>
            <input
              id="file"
              name="file"
              className="file-input"
              type="file"
              size={60}
              style={{ color: "transparent" }}
              onChange={(e) => {
                setFileUpload(e.target.files[0]);
              }}
            />
          </>
        )}
        <button
          type="submit"
          className={isFormValid ? "submit-btn submit-btn-done" : "submit-btn"}
        ></button>
      </form>
    </div>
  );
};

export default CardMain;
