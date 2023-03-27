import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const ShowPage = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPost = (id) => {

        axios.get(`http://localhost:3001/posts/${id}`)
            .then((res) => {
                setPost(res.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        getPost(id);
    }, [id]);

    const printDate = (timeStamp) => {
        return new Date(timeStamp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }


    return (
        <div>
            <h1>{post.title}</h1>
            <small className="text-muted">Created At : {printDate(post.createdAt)}</small>
            <hr />
            <p>{post.body}</p>
        </div>
    );
}

export default ShowPage;
