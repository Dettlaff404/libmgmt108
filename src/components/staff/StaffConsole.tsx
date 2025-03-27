import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import EditStaff from './EditStaff';
import AddStaff from './AddStaff';
import { AddStaffData, DeleteStaff, GetStaffs, UpdateStaff } from '../../service/StaffData';
import { useLocation } from 'react-router';
import styles from './staffstyle.module.css'
import { useNavigate } from 'react-router';

export function StaffConsole() {


    interface Staff {
        staffId: string;
        firstName: string;
        lastName: string;
        email: string;
        joinDate: string;
        phone: string;
        role: string;
    }

    const [staffData, setStaffData] = useState<Staff[]>([])
    const [selectedRow, setSelectedRow] = useState<Staff | null>(null)
    const [showEditStaffForm, setShowEditStaffForm] = useState(false) //handle show the staff edit form
    const [showAddStaffForm, setShowAddStaffForm] = useState(false) //handle show the staff add form

    const navigate = useNavigate();

    //add useEffect to load data
    useEffect(() => {
        const loadData = async () => {
            try {
                const staffDetails = await GetStaffs()
                setStaffData(staffDetails) 
            } catch (error) {
                navigate('/unauth')
                console.error("Failed to fetch staffs", error)
            }
        }
        loadData();
    }, [navigate])

    const tHeads: string [] = [
        "Staff Id",
        "First Name",
        "Last Name",
        "Email",
        "Join Date",
        "Last Update Date",
        "Last Update Time",
        "Phone",
        "Role",
        "Action"
    ];

    //handle edit function
    const handleEdit = (row: Staff) => {
        console.log("handle edit : ", row)
        setSelectedRow(row);
        setShowEditStaffForm(true);
    }

    const handleClose = () => {
        setShowEditStaffForm(false);
    }

    const handleUpdate = (updatedStaff: Staff) => {
        const updatedStaffs = staffData.map((staff) =>
            staff.staffId === updatedStaff.staffId ? updatedStaff : staff
        );
        setStaffData(updatedStaffs);
    };

    //handle delete function
    const handleDelete = async (staffId: string) => {
        try {
            await DeleteStaff(staffId);
            setStaffData(staffData.filter((staff) => staff.staffId !== staffId));
        } catch (error) {
            console.error("Failed to delete staff member", error)
        }
    }

    const handleAdd = (newStaff: Staff) => {
        setStaffData((prevData) => [...prevData, newStaff]);
    }

    //get location of current route
    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home";
    const formatedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1) + " Console";

    return (
        <>
            <div className='d-flex justify-content-end p-3'>
                <Button variant="outline-primary" onClick={() => setShowAddStaffForm(true)}>Add</Button>
            </div>
            <p className={styles.staffTitle}>{formatedTitle}</p>
            <Table striped bordered hover>
                <thead className='text-center'>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {staffData.map((row) => (
                        <tr key={row.staffId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td className='d-flex justify-content-center'>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.staffId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditStaff
                show={showEditStaffForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateStaffs={UpdateStaff}
            />
            <AddStaff
                show={showAddStaffForm}
                handleClose={() => setShowAddStaffForm(false)}
                handleAdd={handleAdd}
                addStaff={AddStaffData}
            />
        </>
    );
}