import { Button, Modal } from 'react-bootstrap';

function PostModal({ handleClose, show, post }) {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{post?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{post?.body}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
}

export default PostModal;