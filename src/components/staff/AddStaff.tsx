import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

interface Staff {
    staffId: string;
    firstName: string;
    lastName: string;
    email: string;
    joinDate: string;
    phone: string;
    role: string;
}

function AddStaff({ show, handleClose, handleAdd, addStaff }: any) {

    //state management
    const [newStaff, setNewStaff] = useState<Staff>({
        staffId: "",
        firstName: "",
        lastName: "",
        email: "",
        joinDate: "",
        phone: "",
        role: ""
    });


    //add book data from the form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStaff((prev) => ({ ...prev, [name]: value }))
    }

    //handle the add book process with the back-end
    const handleOnSubmit = async () => {
        try {
            const newStaffDetails = await addStaff(newStaff);
            handleAdd(newStaffDetails)
            handleClose()
        } catch (err) {
            console.error("Failed to add the staff member", err)
        }
    }

    const createFormElement = (label: string, name: keyof Staff, type = "text") => (
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control
                type={type}
                name={name}
                value={newStaff[name]}
                onChange={handleOnChange}
            />
        </FloatingLabel>
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Staff Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form */}
                <Form>
                    {createFormElement("First Name", "firstName")}
                    {createFormElement("Last Name", "lastName")}
                    {createFormElement("Email", "email")}
                    {createFormElement("Join Date", "joinDate", "date")}
                    {createFormElement("Phone", "phone")}
                    {createFormElement("Role", "role")}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleOnSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddStaff;