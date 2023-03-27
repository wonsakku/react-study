import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const BlogForm = () => {


    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const history = useHistory();

    const onSubmit = (e) => {
        // console.log(e);
        // console.log(e.target);
        // console.log(title);
        // console.log(body);

        axios.post("http://localhost:3001/posts", {
            title,
            body,
            createdAt: Date.now()
        }).then(() => { history.push("/blogs") });
    }

    return (
        <div>
            <h1>Create a Blog Post</h1>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input className="form-control" value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }}></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea className='form-control' value={body}
                    onChange={(e) => {
                        setBody(e.target.value);
                    }}
                    rows="20" />
            </div>
            <button className="btn btn-primary" onClick={onSubmit}>
                Post
            </button>
        </div>
    );
};

export default BlogForm;