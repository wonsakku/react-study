import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Toast from './Toast';

const BlogForm = ({ editing, addToast }) => {


    const { id } = useParams();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [originalBody, setOriginalBody] = useState('');
    const [publish, setPublish] = useState(false);
    const [originalPublish, setoriginalPublish] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);

    useEffect(() => {
        if (editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then(res => {
                setTitle(res.data.title);
                setOriginalTitle(res.data.title);
                setBody(res.data.body);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setoriginalPublish(res.data.publish);
            });
        }
    }, [id, editing]);

    const isEdited = () => {
        return title !== originalTitle || body !== originalBody || publish !== originalPublish;
    }

    const goBack = () => {
        if (editing) {
            history.push(`/blogs/${id}`);
        } else {
            history.push("/blogs");
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
            }).then((res) => { history.push(`/blogs/${id}`) });

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

                history.push("/admin");
            });
        }
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