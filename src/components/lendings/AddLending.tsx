import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

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

function AddLending({ show, handleClose, handleAdd, addLending }: any) {

    //state management
    const [newLending, setNewLending] = useState<Lending>({
        lendingId: "",
        member: "",
        book: "",
        lendingDate: "",
        returnDate: "",
        isActiveLending: "",
        overDueDays: 0,
        fineAmount: 0
    });


    //add book data from the form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLending((prev) => ({ ...prev, [name]: value }))
    }

    //handle the add book process with the back-end
    const handleOnSubmit = async () => {
        try {
            const newLendingDetails = await addLending(newLending);
            handleAdd(newLendingDetails)
            handleClose()
        } catch (err) {
            console.error("Failed to update the book", err)
        }
    }

    const createFormElement = (label: string, name: keyof Lending, type = "text") => (
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control
                type={type}
                name={name}
                value={newLending[name]}
                onChange={handleOnChange}
            />
        </FloatingLabel>
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form */}
                <Form>
                    {createFormElement("Member ID", "member", "text")}
                    {createFormElement("Book ID", "book", "text")}
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

export default AddLending;