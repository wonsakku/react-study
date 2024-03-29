import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Toast from './Toast';
import useToast from '../hooks/toast';
import LoadingSpinner from './LoadingSpinner';


const BlogForm = ({ editing }) => {


    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [originalBody, setOriginalBody] = useState('');
    const [publish, setPublish] = useState(false);
    const [originalPublish, setoriginalPublish] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addToast } = useToast();

    useEffect(() => {
        if (editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then(res => {
                setTitle(res.data.title);
                setOriginalTitle(res.data.title);
                setBody(res.data.body);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setoriginalPublish(res.data.publish);
                setLoading(false);
            }).catch(e => {
                setError("something went wrong in db");
                addToast({
                    "type": "danger",
                    "text": "something went wrong in db"
                });
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [id, editing]);

    const isEdited = () => {
        return title !== originalTitle || body !== originalBody || publish !== originalPublish;
    }

    const goBack = () => {
        if (editing) {
            navigate(`/blogs/${id}`);
        } else {
            navigate("/blogs");
        }
    }

    const onChangePublish = (e) => {
        setPublish(e.target.checked);
    }

    const validateForm = () => {
        let validated = true;

        if (title === '') {
            setTitleError(true);
            validated = false;
        }

        if (body === '') {
            setBodyError(true);
            validated = false;
        }

        return validated;
    }


    const onSubmit = (e) => {
        setTitleError(false);
        setBodyError(false);

        if (!validateForm()) {
            return;
        }

        if (editing) {
            axios.patch(`http://localhost:3001/posts/${id}`, {
                title,
                body,
                publish
            }).then((res) => {
                navigate(`/blogs/${id}`)
            }).catch(e => {
                addToast({
                    "type": "danger",
                    "text": "We could not update blog"
                });
            });

        } else {
            axios.post("http://localhost:3001/posts", {
                title,
                body,
                publish,
                createdAt: Date.now()
            }).then(() => {
                addToast({
                    "type": "success",
                    "text": "successfully created!"
                });

                navigate("/admin");
            }).catch(e => {
                addToast({
                    "type": "danger",
                    "text": "We could not create blog"
                });
            });
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>{editing ? "Edit" : "Create"} a Blog Post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input className={`form-control ${titleError ? "border-danger" : ""}`} value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }}></input>
                {titleError &&
                    <div className="text-danger">
                        Title is required
                    </div>
                }
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea className={`form-control ${bodyError ? "border-danger" : ""}`} value={body}
                    onChange={(e) => {
                        setBody(e.target.value);
                    }}
                    rows="10" />

                {bodyError &&
                    <div className="text-danger">
                        Body is required
                    </div>
                }

            </div>
            <div className='form-check mb-3'>
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={publish}
                    onChange={onChangePublish} />
                <label className="form-check-label">Publish</label>
            </div>
            <button className="btn btn-primary"
                onClick={onSubmit}
                disabled={editing && !isEdited()}>
                {editing ? "Edit" : "Post"}
            </button>
            <button
                className="btn btn-danger ms-2"
                onClick={goBack}
            >
                Cancel
            </button>

        </div >
    );
};

BlogForm.propTypes = {
    editing: propTypes.bool
}


BlogForm.defaultProps = {
    editing: false
}




export default BlogForm;