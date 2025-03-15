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
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default EditBook;