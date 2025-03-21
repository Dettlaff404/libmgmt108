import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

interface MemberEditProps {
    show: boolean;
    selectedRow: Member | null;
    handleClose: () => void;
    handleUpdate: (updatedMember: Member) => void
    updateMembers: (member: Member) => Promise<void>
}

interface Member {
    memberId: string;
    name: string;
    email: string;
    membershipDate: string;
}

function EditMember({ show, selectedRow, handleClose, handleUpdate, updateMembers }: MemberEditProps) {

    //state management
    const [member, setMember] = useState<Member>({
        memberId: "",
        name: "",
        email: "",
        membershipDate: ""
    });

    //need load data when component mounted
    useEffect(() => {
        if (selectedRow) {
            setMember({ ...selectedRow });
        }
    }, [selectedRow]);

    //add book data from the form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMember({ ...member, [e.target.name]: e.target.value });
    }

    //handle the save/update data
    const handleSave = async () => {
        try {
            await updateMembers(member);
            handleUpdate(member);
            handleClose();
        } catch (error) {
            console.error("Failed to update member", error)
        }
    }

    //handle repeat of floating label
    const renderFloatingLabel = (label: string, name: keyof Member, type = "text", readOnly = false) => (
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control
                type={type}
                name={name}
                value={member[name]}
                onChange={handleOnChange}
                readOnly={readOnly}
            />
        </FloatingLabel>
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form */}
                <Form>
                    {renderFloatingLabel("Member Id", "memberId", "text", true)}
                    {renderFloatingLabel("Name", "name")}
                    {renderFloatingLabel("Email", "email")}
                    {renderFloatingLabel("Membership Date", "membershipDate")}
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

export default EditMember;