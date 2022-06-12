import React, { useEffect, useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


function home() {
    let navigate = useNavigate();
    const [Data, setData] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('session');

        if (!token) {
            navigate('/');
        }

        fetch("http://localhost:3000/users", {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));



    }, [0]);

    let autoLogout = setTimeout(() => {
        localStorage.removeItem('session');
        navigate('/')
    }, 600000); // 10 min is equal to 600000 milliseconds

    const logOutNow = () => {
        localStorage.removeItem('session');
        navigate('/')
    }

    setInterval(function () {
        console.log('Time left: ' + getTimeLeft(autoLogout) + 's');
    }, 2000);

    function getTimeLeft(autoLogout) {
        return Math.ceil((autoLogout._idleStart + autoLogout._idleTimeout - Date.now()) / 1000);
    }

    console.log(getTimeLeft);


    return (
        <>
            <div class="header">
                <a href="#default" class="logo">MERN Stack</a>
                <div class="header-right">
                    <a class="active" >Session Time out in <span>10 Min</span></a>
                    <a class="active" onClick={logOutNow}>Log Out</a>
                </div>
            </div>

            <div className='TableData'>
                <h1>List of Previous Logedin</h1>
                <MDBTable>
                    <MDBTableHead className="active" color="primary-color" textWhite>
                        <tr className='active'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {Data.map((r, i) => {
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{r.name}</td>
                                    <td>{r.Email}</td>
                                    <td>{r.number}</td>
                                </tr>
                            )
                        })}
                        {/* <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr> */}

                    </MDBTableBody>
                </MDBTable>
            </div>
        </>
    )
}

export default home