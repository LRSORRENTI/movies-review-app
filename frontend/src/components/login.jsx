/* 
NOTE: Not doing full authentication, might add 
ways to protect routes, salt and hash passwords,
authorization, resetting passwords, CSRF protection,
sessions etc.. later

*/


import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login(props) {
    const [name, setName] = useState("")
    const [id, setId] = useState("")

    const onChangeName = (evt) => {
        const name = evt.target.value;
        setName(name)
    }

    const onChangeID = (evt) => {
        const id = evt.target.value;
        setId(id)
    }

    const login = () => {
        props.login({name: name, id: id})
        props.history.push('/')
    }
    return (
        <div>
            <Form>
                <Form.Group>
                    
                </Form.Group>
            </Form>
        </div>
    );
};