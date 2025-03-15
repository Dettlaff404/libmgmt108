import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { GetBooks } from '../service/books/GetBooks';
import EditBook from './EditBook';
import { DeleteBook } from '../service/books/DeleteBook';

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
        lastUpdateDate: string;
        lastUpdateTime: string;
    }

    const [bookData, setBookData] = useState<Book[]>([])
    const [selectedRow, setSelectedRow] = useState<Book | null>(null)
    const [showEditBookForm, setShowEditBookForm] = useState(false) //handle show the book edit form

    //add useEffect to load data
    useEffect(() => {
        const loadData = async () => {
            const bookDetails = await GetBooks()
            console.log(bookDetails)
            setBookData(bookDetails)
        }
        loadData();
    }, [])

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
    }

    //handle delete function
    const handleDelete = async (bookId: string) => {
        try {
            await DeleteBook(bookId);
            setBookData(bookData.filter((book) => book.bookId !== bookId));
        } catch (error) {
            console.error("Failed to delete book", error)   
        }
    }


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bookData.map((row) => (
                        <tr key={row.bookId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td>
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
            />
        </>
    );
}