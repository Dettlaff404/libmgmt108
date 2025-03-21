import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

interface BookEditProps {
    show: boolean;
    selectedRow: Book | null;
    handleClose: () => void;
    handleUpdate: (updatedBook: Book) => void
    updateBooks: (book : Book) => Promise<void>
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

function EditBook({ show, selectedRow, handleClose, handleUpdate, updateBooks }: BookEditProps) {

    //state management
    const [book, setBook] = useState<Book>({
        bookId: "",
        bookName: "",
        author: "",
        edition: "",
        publisher: "",
        isbn: "",
        price: 0,
        totalQty: 0,
        availableQty: 0,
        lastUpdateDate: "",
        lastUpdateTime: "",
    });

    //need load data when component mounted
    useEffect(() => {
        if (selectedRow) {
            setBook({ ...selectedRow });
        }
    }, [selectedRow]);

    //add book data from the form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    //handle the save/update data
    const handleSave = async () => {
        try {
            await updateBooks(book);
            handleUpdate(book);
            handleClose();
        } catch (error) {
            console.error("Failed to update book", error)
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form */}
                <Form>
                    <FloatingLabel controlId="floatingInput" label="Book ID" className="mb-3">
                        <Form.Control
                            readOnly
                            type="text"
                            name='bookId'
                            value={book.bookId}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Book Name" className="mb-3">
                        <Form.Control
                            type="text"
                            name='bookName'
                            value={book.bookName}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Author" className="mb-3">
                        <Form.Control
                            type="text"
                            name='author'
                            value={book.author}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Edition" className="mb-3">
                        <Form.Control
                            type="text"
                            name='edition'
                            value={book.edition}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Publisher" className="mb-3">
                        <Form.Control
                            type="text"
                            name='publisher'
                            value={book.publisher}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="ISBN" className="mb-3">
                        <Form.Control
                            type="text"
                            name='isbn'
                            value={book.isbn}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
                        <Form.Control
                            type="number"
                            name='price'
                            value={book.price}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Total Quantity" className="mb-3">
                        <Form.Control
                            type="number"
                            name='totalQty'
                            value={book.totalQty}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Available Quantity" className="mb-3">
                        <Form.Control
                            type="number"
                            name='availableQty'
                            value={book.availableQty}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditBook;