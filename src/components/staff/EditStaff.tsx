import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

interface StaffEditProps {
    show: boolean;
    selectedRow: Staff | null;
    handleClose: () => void;
    handleUpdate: (updatedStaff: Staff) => void
    updateStaffs: (staff: Staff) => Promise<void>
}

interface Staff {
    staffId: string;
    firstName: string;
    lastName: string;
    email: string;
    joinDate: string;
    phone: string;
    role: string;
}

function EditStaff({ show, selectedRow, handleClose, handleUpdate, updateStaffs }: StaffEditProps) {

    //state management
    const [staff, setStaff] = useState<Staff>({
        staffId: "",
        firstName: "",
        lastName: "",
        email: "",
        joinDate: "",
        phone: "",
        role: ""
    });

    //need load data when component mounted
    useEffect(() => {
        if (selectedRow) {
            setStaff({ ...selectedRow });
        }
    }, [selectedRow]);

    //add book data from the form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStaff({ ...staff, [e.target.name]: e.target.value });
    }

    //handle the save/update data
    const handleSave = async () => {
        try {
            await updateStaffs(staff);
            handleUpdate(staff);
            handleClose();
        } catch (error) {
            console.error("Failed to update staff member", error)
        }
    }

    //handle repeat of floating label
    const renderFloatingLabel = (label: string, name: keyof Staff, type = "text", readOnly = false) => (
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control
                type={type}
                name={name}
                value={staff[name]}
                onChange={handleOnChange}
                readOnly={readOnly}
            />
        </FloatingLabel>
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Staff Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form */}
                <Form>
                    {renderFloatingLabel("Member Id", "staffId", "text", true)}
                    {renderFloatingLabel("First Name", "firstName")}
                    {renderFloatingLabel("Last Name", "lastName")}
                    {renderFloatingLabel("Email", "email")}
                    {renderFloatingLabel("Join Date", "joinDate")}
                    {renderFloatingLabel("Phone", "phone")}
                    {renderFloatingLabel("Role", "role")}
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

export default EditStaff;