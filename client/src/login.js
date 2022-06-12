import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";

export default function Login() {
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('session');
        if (token) {
            navigate('/home');
        }
    }, [])


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [err, setErr] = useState("");

    function validateForm() {
        return email.length > 0 && number.length > 0 && name.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, number, name);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3000/users", requestOptions)
            .then(response => response.json())
            .then(result => checkExist(result))
            .catch(error => console.log('error', error));


        const checkExist = (result) => {
            let checkUser = false;
            result.map((r) => {
                console.log(r.Email);
                if (r.Email == email) {
                    setErr("Email Allrady Logedin once!");
                    console.log("Mail is mached");
                    checkUser = true;
                }
            })
            if (!checkUser) {
                // POST request using fetch()
                fetch("http://localhost:3000/add_user", {

                    // Adding method type
                    method: "POST",

                    // Adding body or contents to send
                    body: JSON.stringify({
                        name: name,
                        Email: email,
                        number: number
                    }),

                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })

                    // Converting to JSON
                    .then(response => response.json())

                    // Displaying results to console
                    .then((json) => {
                        // <Redirect to="/home" />
                        const checkEmail = json.Email;
                        // store session in local storage
                        localStorage.setItem('session', json.Email);
                        navigate('/home')
                    });
            }
        }

    }

    return (
        <div className="Login">
            <h1>Login Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        placeholder="Enter Your Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Enter Your Email I'd"
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="number">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        placeholder="Enter Your Mobile Number"
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </Form.Group>
                <Button block="true" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
            <h1 style={{ color: "red" }}>{err}</h1>
        </div>
    );
}
