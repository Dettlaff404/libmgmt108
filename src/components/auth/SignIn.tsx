import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SignInTask } from '../../service/Auth';

export const SignIn = () => {

    interface SignIn {
        email: string,
        password: string
    }

    const [user, setUser] = useState<SignIn>(
        {
            email: "",
            password: ""
        }
    )

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleOnSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        //API request
        const token = await SignInTask(user);

        console.log(token)
        setUser(
            { 
                email: "", 
                password: ""
            }
        )
    }

    return (
        <>
            <h1>Sign In</h1>

            <Form className="d-flex flex-column align-items-center mt-5" onSubmit={handleOnSubmit}>
                <div className='w-50'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email"
                            value={user.email}
                            onChange={handleOnChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            name="password"
                            value={user.password}
                            onChange={handleOnChange}
                        />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        LogIn
                    </Button>
                </div>
            </Form>
        </>
    )
}