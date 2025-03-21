import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

// interface BookEditProps {
//     show: boolean;
//     selectedRow: Book | null;
//     handleClose: () => void;
//     handleUpdate: (updatedBook: Book) => void
// }

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

function AddBook({ show, selectedRow, handleClose, handleAdd, addBook }: any) {

    //state management
    const [newBook, setNewBook] = useState<Book>({
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


    //add book data from the form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }))
    }

    //handle the add book data
    const handleOnSubmit = async () => {
        try {
            const newBookDataDetails = await addBook(newBook);
            handleAdd(newBookDataDetails);
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

                    <FloatingLabel controlId="floatingInput" label="Book Name" className="mb-3">
                        <Form.Control
                            type="text"
                            name='bookName'
                            value={newBook.bookName}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Author" className="mb-3">
                        <Form.Control
                            type="text"
                            name='author'
                            value={newBook.author}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Edition" className="mb-3">
                        <Form.Control
                            type="text"
                            name='edition'
                            value={newBook.edition}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Publisher" className="mb-3">
                        <Form.Control
                            type="text"
                            name='publisher'
                            value={newBook.publisher}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="ISBN" className="mb-3">
                        <Form.Control
                            type="text"
                            name='isbn'
                            value={newBook.isbn}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
                        <Form.Control
                            type="number"
                            name='price'
                            value={newBook.price}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Total Quantity" className="mb-3">
                        <Form.Control
                            type="number"
                            name='totalQty'
                            value={newBook.totalQty}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingInput" label="Available Quantity" className="mb-3">
                        <Form.Control
                            type="number"
                            name='availableQty'
                            value={newBook.availableQty}
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleOnSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddBook;