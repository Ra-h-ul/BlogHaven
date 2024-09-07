import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UseAuthRedirect from "../../components/UseAuthRedirect/UseAuthRedirect";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../lib/env";

function Editpost() {
  UseAuthRedirect();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  const editpost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    if (thumbnail) postData.set('thumbnail', thumbnail);

    try {
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await axios.patch(
        `${REACT_APP_BASE_URL}/posts/edit/${id}`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      console.log(error);
    }
  };


  useEffect(()=>{
    const getpost = async()=>{
      try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/posts/${id}`)
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
    }
    getpost();
  },[])

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form_error-message">{error}</p>}
        <form className="form create-post_form" onSubmit={editpost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="q1-editor">
            <ReactQuill
              modules={modules}
              formats={formats}
              value={description}
              onChange={setDescription}
            />
          </div>

          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/png, image/jpeg, image/jpg"
          />

          <button type="submit" className="btn primary">
            Edit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Editpost;
