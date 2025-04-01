import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import HandOverLending from './HandOverLending';
import AddLending from './AddLending';
import { AddLendingData, DeleteLending, GetLendings, UpdateLending } from '../../service/LendingData';
import { useLocation } from 'react-router';
import styles from './lendingstyle.module.css'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

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

    const navigate = useNavigate();

    //add useEffect to load data
    useEffect(() => {
        const loadData = async () => {
            try {
                const lendingDetails = await GetLendings()
                setLendingData(lendingDetails)
            } catch (error) {
                navigate('/unauth')
                console.error("Failed to fetch lendings", error)
            }
        }
        loadData();
    }, [navigate])

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

    const handleUpdate = async () => {
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
        await Swal.fire({
            title: 'Success!',
            text: 'Handed over successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    //handle delete function
    const handleDelete = async (lendingId: string) => {
        //impl custom delete alert
        const result = await Swal.fire({
            title: 'Are you sure to delete this record?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await DeleteLending(lendingId);
                setLendingData(lendingData.filter((lending) => lending.lendingId !== lendingId));
            } catch (error) {
                console.error("Failed to delete lending", error)
            }
        }
    }

    const handleAdd = async (newLending: Lending) => {
        setLendingData((prevData) => [...prevData, newLending]);
        await Swal.fire({
            title: 'Success!',
            text: 'Lending added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
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