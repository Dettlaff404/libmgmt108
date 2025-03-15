import { use, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { GetBooks } from '../service/books/GetBooks';

export function BookConsole() {

    interface Book {
        bookId:string;
        bookName:string;
        author:string;
        edition:string;
        publisher:string;
        isbn:string;
        price:number;
        totalQty:number;
        availableQty:number;
        lastUpdateDate:string;
        lastUpdateTime:string;
    }

    const [bookData, setBookData] = useState<Book[]>([])

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
        "Last Updated Time"
    ];


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
                    {bookData.map((row) =>(
                        <tr key={row.bookId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}