/* 
NOTE: Not doing full authentication, might add 
ways to protect routes, salt and hash passwords,
authorization, resetting passwords, CSRF protection,
sessions etc.. later

*/


import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../login.css'

export default function Login(props) {
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    // set intitial names to emptry strings


    const onChangeName = (evt) => {
        const name = evt.target.value;
        setName(name)
    }


    const onChangeID = (evt) => {
        const id = evt.target.value;
        setId(id)
    }

    // bind the input fields from the above 
    // functions 

    const login = () => {
        props.login({name: name, id: id})
        props.history.push('/')
    }
    // When submit is pressed it calls login, remember 
    // in App.jsx:
    // <Route path="/login" render={(props) => (
    //     <Login {...props} login={login} />)}/>

    return (
        <div className="wrap-login">
        <div className="login-container">
        <Form className="login-form">
                <Form.Group>
                    <Form.Label className="form-label">
                        Username
                    </Form.Label>
                    <Form.Control 
                     type="text"
                     placeholder="Enter username"
                     value={name}
                     onChange={onChangeName}
                     />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        ID
                    </Form.Label>
                    <Form.Control
                     type="text"
                     placeholder="Enter ID"
                     value={id}
                     onChange={onChangeID}
                     />
                </Form.Group>
                <Button variant="primary"
                        onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
        </div>
    );
};