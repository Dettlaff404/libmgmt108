import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import EditMember from './EditMember';
import AddMember from './AddMember';
import { AddMemberData, DeleteMember, GetMembers, UpdateMember } from '../../service/MemberData';
import { useLocation } from 'react-router';

export function MemberConsole() {

    interface Member {
        memberId: string;
        name: string;
        email: string;
        membershipDate: string;
    }

    const [memberData, setMemberData] = useState<Member[]>([])
    const [selectedRow, setSelectedRow] = useState<Member | null>(null)
    const [showEditMemberForm, setShowEditMemberForm] = useState(false) //handle show the member edit form
    const [showAddMemberForm, setShowAddMemberForm] = useState(false) //handle show the member add form

    //add useEffect to load data
    useEffect(() => {
        const loadData = async () => {
            const memberDetails = await GetMembers()
            console.log(memberDetails)
            setMemberData(memberDetails)
        }
        loadData();
    }, [])

    const tHeads: string[] = [
        "Member ID",
        "Name",
        "Email",
        "Membership Date",
        "Action"
    ];

    //handle edit function
    const handleEdit = (row: Member) => {
        console.log("handle edit : ", row)
        setSelectedRow(row);
        setShowEditMemberForm(true);
    }

    const handleClose = () => {
        setShowEditMemberForm(false);
    }

    const handleUpdate = (updatedMember: Member) => {
        const updatedMembers = memberData.map((member) =>
            member.memberId === updatedMember.memberId ? updatedMember : member
        );
        setMemberData(updatedMembers);
    };

    //handle delete function
    const handleDelete = async (memberId: string) => {
        try {
            await DeleteMember(memberId);
            setMemberData(memberData.filter((member) => member.memberId !== memberId));
        } catch (error) {
            console.error("Failed to delete member", error)
        }
    }

    const handleAdd = (newMember: Member) => {
        setMemberData((prevData) => [...prevData, newMember]);
    }

    const location = useLocation();
    const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home";
    const formatedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1) + " Console";

    return (
        <>
            <div className='d-flex justify-content-end p-3'>
                <Button variant="outline-primary" onClick={() => setShowAddMemberForm(true)}>Add</Button>
            </div>
            <h1>{formatedTitle}</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tHeads.map((headings) => (
                            <th>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {memberData.map((row) => (
                        <tr key={row.memberId}>
                            {Object.values(row).map((cell, index) => (
                                <td key={index}>{cell}</td>
                            ))}
                            <td>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleEdit(row)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDelete(row.memberId)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditMember
                show={showEditMemberForm}
                selectedRow={selectedRow}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                updateMembers={UpdateMember}
            />
            <AddMember
                show={showAddMemberForm}
                handleClose={() => setShowAddMemberForm(false)}
                handleAdd={handleAdd}
                addMember={AddMemberData}
            />
        </>
    );
}