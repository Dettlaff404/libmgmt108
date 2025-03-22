import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

interface LendingEditProps {
    show: boolean;
    selectedRow: Lending | null;
    handleClose: () => void;
    handleUpdate: () => void
    updateLendings: (lending: Lending) => Promise<void>
}

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

function HandOverLending({ show, selectedRow, handleClose, handleUpdate, updateLendings }: LendingEditProps) {

    //state management
    const [lending, setLending] = useState<Lending>({
        lendingId: "",
        member: "",
        book: "",
        lendingDate: "",
        returnDate: "",
        isActiveLending: "",
        overDueDays: 0,
        fineAmount: 0
    });

    //need load data when component mounted
    useEffect(() => {
        if (selectedRow) {
            setLending({ ...selectedRow });
        }
    }, [selectedRow]);

    //add book data from the form
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLending({ ...lending, [e.target.name]: e.target.value });
    }

    //handle the save/update data
    const handleSave = async () => {
        try {
            await updateLendings(lending);
            handleUpdate();
            handleClose();
        } catch (error) {
            console.error("Failed to update the lending", error)
        }
    }

    //handle repeat of floating label
    const renderFloatingLabel = (label: string, name: keyof Lending, type = "text", readOnly = true) => (
        <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control
                type={type}
                name={name}
                value={lending[name]}
                onChange={handleOnChange}
                readOnly={readOnly}
            />
        </FloatingLabel>
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hand Over Lending</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form */}
                <Form>
                    {renderFloatingLabel("Lending ID", "lendingId")}
                    {renderFloatingLabel("Member ID", 'member')}
                    {renderFloatingLabel("Book ID", "book")}
                    {renderFloatingLabel("Lending Date", "lendingDate")}
                    {renderFloatingLabel("Return Date", "returnDate")}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Hand Over
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HandOverLending;