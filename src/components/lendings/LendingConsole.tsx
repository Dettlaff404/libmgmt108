import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import HandOverLending from './HandOverLending';
import AddLending from './AddLending';
import { AddLendingData, DeleteLending, GetLendings, UpdateLending } from '../../service/LendingData';
import { useLocation } from 'react-router';
import styles from './lendingstyle.module.css'

export function LendingConsole() {

    interface Lending {
        lendingId: string;
        member: string;
        book: string;
        lendingDate: string;
        returnDate: string;
        isActiveLending: string;
        overDueDays: number;
        fineAmount: number;
    }

    const [lendingData, setLendingData] = useState<Lending[]>([])
    const [selectedRow, setSelectedRow] = useState<Lending | null>(null)
    const [showEditLendingForm, setShowEditLendingForm] = useState(false) //handle show the lending edit form
    const [showAddLendingForm, setShowAddLendingForm] = useState(false) //handle show the lending add form

    //add useEffect to load data
    useEffect(() => {
        const loadData = async () => {
            const lendingDetails = await GetLendings()
            console.log(lendingDetails)
            setLendingData(lendingDetails)
        }
        loadData();
    }, [])

    const tHeads: string[] = [
        "Lending ID",
        "Member ID",
        "Book ID",
        "Lending Date",
        "Return Date",
        "Lending Status",
        "Over Due Days",
        "Fine Amount",
        "Action"
    ];

    //handle edit function
    const handleEdit = (row: Lending) => {
        console.log("handle edit : ", row)
        setSelectedRow(row);
        setShowEditLendingForm(true);
    }

    const handleClose = () => {
        setShowEditLendingForm(false);
    }

    const handleUpdate = () => {
        // const updatedLendings = lendingData.map((lending) =>
        //     lending.lendingId === updatedLending.lendingId ? updatedLending : lending
        // );
        // setLendingData(updatedLendings);
        const loadData = async () => {
            const lendingDetails = await GetLendings()
            console.log(lendingDetails)
            setLendingData(lendingDetails)
        }
        loadData();
    };

    //handle delete function
    const handleDelete = async (lendingId: string) => {
        try {
            await DeleteLending(lendingId);
            setLendingData(lendingData.filter((lending) => lending.lendingId !== lendingId));
        } catch (error) {
            console.error("Failed to delete lending", error)
        }
    }

    const handleAdd = (newLending: Lending) => {
        setLendingData((prevData) => [...prevData, newLending]);
    }

    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home";
    const formatedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1) + " Console";

    return (
        <>
            <div className='d-flex justify-content-end p-3'>
                <Button variant="outline-primary" onClick={() => setShowAddLendingForm(true)}>Add</Button>
            </div>
            <p className={styles.lendingTitle}>{formatedTitle}</p>
            <Table striped bordered hover>
                <thead className='text-center'>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {lendingData.map((row) => (
                        <tr key={row.lendingId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Hand Over</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.lendingId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <HandOverLending
                show={showEditLendingForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateLendings={UpdateLending}
            />
            <AddLending
                show={showAddLendingForm}
                handleClose={() => setShowAddLendingForm(false)}
                handleAdd={handleAdd}
                addLending={AddLendingData}
            />
        </>
    );
}