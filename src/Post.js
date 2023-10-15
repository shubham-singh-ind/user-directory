import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Post.css';
import { useState } from 'react';
import PostModal from './Model';

function Post({ post }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <>
      <Card className='Post' onClick={handleShow}>
        <Card.Body>
          <Card.Title>{post?.title}</Card.Title>
          <Card.Text>
              {post?.body?.length <= 70 ? post?.body : post?.body?.slice(0, 70) + "..."}
          </Card.Text>
        </Card.Body>
      </Card>
      <PostModal show={show} handleClose={handleClose} post={post} />
    </>
  );
}

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
    }).isRequired
};

export default Post;
