import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignUp = () => {
    return (
        <>
            <h1>Sign Up</h1>

            <Form className="d-flex flex-column align-items-center mt-5">
                <div className='w-50'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" placeholder="Enter Role" />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </>
    )
}