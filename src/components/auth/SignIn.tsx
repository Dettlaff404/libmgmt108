import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SignInTask } from '../../service/Auth';
import styles from './Signformstyle.module.css'
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router';

export const SignIn = () => {

    interface SignIn {
        email: string,
        password: string
    }

    const { login } = useAuth();
    const navigate = useNavigate();

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
        login(token);
        setUser(
            {
                email: "",
                password: ""
            }
        )
        //navigate to /book
        navigate('/book');
    }

    return (
        <>
            <p className={styles.formTitle}>Sign In</p>

            <Form className="d-flex flex-column align-items-center mt-5" onSubmit={handleOnSubmit}>
                <div className={styles.formCard}>
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
                    <div className="d-flex justify-content-end">
                        <Button variant="success w-50 mt-3 mb-2" type="submit">
                            LogIn
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}