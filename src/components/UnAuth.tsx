import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from './auth/AuthProvider';

export const UnAuth = () => {

    const { logout } = useAuth();

    const handleOnClick = () => {
        logout();
    }

    return (
        <Container fluid className="vh-100 bg-dark d-flex align-items-top justify-content-center pt-5">
            <Row>
                <Col>
                    <Alert variant="danger" className="text-center p-4 shadow-lg">
                        <div className="mb-4 text-center">
                            <div 
                                className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: '80px', 
                                    height: '80px', 
                                    margin: '0 auto',
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    border: '2px solid #dc3545'
                                }}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="50" 
                                    height="50" 
                                    fill="#dc3545" 
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="display-4 text-danger mb-3">Access Denied</h1>
                        <p className="lead text-dark">
                            You do not have permission to access this resource.
                        </p>
                        <div className="mt-4">
                            <Alert.Link href="/" className="btn btn-danger" onClick={handleOnClick}>
                                Return to Home
                            </Alert.Link>
                        </div>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}