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
    updateBooks: (book: Book) => Promise<void>
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
        availableQty: 0
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

    //handle repeat of floating label
    const renderFloatingLabel = (label: string, name: keyof Book, type = "text", readOnly = false) => (
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control
                type={type}
                name={name}
                value={book[name]}
                onChange={handleOnChange}
                readOnly={readOnly}
            />
        </FloatingLabel>
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form */}
                <Form>
                    {renderFloatingLabel("Book Id", "bookId", "text", true)}
                    {renderFloatingLabel("Book Name", "bookName")}
                    {renderFloatingLabel("Author", "author")}
                    {renderFloatingLabel("Edition", "edition")}
                    {renderFloatingLabel("Publisher", "publisher")}
                    {renderFloatingLabel("ISBN", "isbn")}
                    {renderFloatingLabel("Price", "price")}
                    {renderFloatingLabel("Total Quantity", "totalQty", "number")}
                    {renderFloatingLabel("Available Quantity", "availableQty", "number")}
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