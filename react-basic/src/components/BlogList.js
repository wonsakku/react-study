import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import propTypes from 'prop-types';


const BlogList = ({ isAdmin }) => {

    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    const getPosts = () => {
        axios.get("http://localhost:3001/posts")
            .then((res) => {
                // console.log(res);
                setPosts(res.data);
                setLoading(false);
            })
    }

    useEffect(() => {
        getPosts();
    }, []);

    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(() => {
                setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
            });
    };


    if (loading) {
        return <LoadingSpinner />
    }

    if (posts.length < 0) {
        return <div>No Blog Posts Found</div>;
    }

    return (
        posts.filter(post => isAdmin || post.publish).map(post => {
            return (
                <Card
                    title={post.title}
                    key={post.id}
                    onClick={() => history.push(`/blogs/${post.id}`)}
                >
                    {isAdmin ? <div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={(e) => deleteBlog(e, post.id)}>Delete</button>
                    </div> : null}
                </Card>
            );
        })
    );

    return (
        <div>Blog List</div>
    );
};

BlogList.propTypes = {
    isAdmin: propTypes.bool
}

BlogList.defaultProps = {
    isAdmin: false
}

export default BlogList;