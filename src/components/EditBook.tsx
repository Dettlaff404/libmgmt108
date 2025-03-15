import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface BookEditProps {
    show: boolean;
    selectedRow: Book | null;
    handleClose: () => void;
    handleUpdate: (updatedBook: Book) => void
}

interface Book {
    bookId: string;
    bookName: string;
    author: string;
    edition: string;
    publisher: string;
    isbn: string;
    price: number;
    totalQty: number;
    availableQty: number;
    lastUpdateDate: string;
    lastUpdateTime: string;
}

function EditBook({ show, selectedRow, handleClose, handleUpdate }: BookEditProps) {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default EditBook;