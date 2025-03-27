import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import EditBook from './EditBook';
import AddBook from './AddBook';
import { AddBookData, UpdateBook, GetBooks, DeleteBook } from '../../service/BookData';
import { useLocation } from 'react-router';
import styles from './bookstyle.module.css'
import { useNavigate } from 'react-router';

export function BookConsole() {

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

    const [bookData, setBookData] = useState<Book[]>([])
    const [selectedRow, setSelectedRow] = useState<Book | null>(null)
    const [showEditBookForm, setShowEditBookForm] = useState(false) //handle show the book edit form
    const [showAddBookForm, setShowAddBookForm] = useState(false) //handle show the book add form

    const navigate = useNavigate();

    //add useEffect to load data
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const bookDetails = await GetBooks()
                setBookData(bookDetails)
            } catch (error) {
                navigate('/unauth')
                console.error("Failed to fetch books", error)
            }
        }
        fetchBooks();
    }, [navigate])

    const tHeads: string[] = [
        "Book ID",
        "Name",
        "Author",
        "Edition",
        "Publisher",
        "ISBN",
        "Price",
        "Total Qty",
        "Available Qty",
        "Last Updated Date",
        "Last Updated Time",
        "Action"
    ];

    //handle edit function
    const handleEdit = (row: Book) => {
        console.log("handle edit : ", row)
        setSelectedRow(row);
        setShowEditBookForm(true);
    }

    const handleClose = () => {
        setShowEditBookForm(false);
    }

    const handleUpdate = (updatedBook: Book) => {
        const updatedBooks = bookData.map((book) =>
            book.bookId === updatedBook.bookId ? updatedBook : book
        );
        setBookData(updatedBooks);
    };

    //handle delete function
    const handleDelete = async (bookId: string) => {
        try {
            await DeleteBook(bookId);
            setBookData(bookData.filter((book) => book.bookId !== bookId));
        } catch (error) {
            console.error("Failed to delete book", error)
        }
    }

    const handleAdd = (newBook: Book) => {
        setBookData((prevData) => [...prevData, newBook]);
    }

    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home";
    const formatedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1) + " Console";

    return (
        <>
            <div className='d-flex justify-content-end p-3'>
                <Button variant="outline-primary" onClick={() => setShowAddBookForm(true)}>Add</Button>
            </div>
            <p className={styles.bookTitle}>{formatedTitle}</p>
            <Table striped bordered hover>
                <thead className='text-center'>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {bookData.map((row) => (
                        <tr key={row.bookId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.bookId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditBook
                show={showEditBookForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateBooks={UpdateBook}
            />
            <AddBook
                show={showAddBookForm}
                handleClose={() => setShowAddBookForm(false)}
                handleAdd={handleAdd}
                addBook={AddBookData}
            />
        </>
    );
}