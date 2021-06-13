import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';

const MakeAdmin = () => {
    const [newAdmin, setNewAdmin] = useState({})

    const handleChange = (event) => {
        setNewAdmin({ email: event.target.value })
    }

    const handleSubmit = () => {
        fetch('https://young-citadel-36577.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newAdmin)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div className="row">
            <div className="col-md-2 border border-primary">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10 text-center border border-primary">
                <form onSubmit={handleSubmit} >
                    <input type="text" className='form-control' name="email" onChange={handleChange} placeholder='Email address' required />
                    <br />
                    <input type="submit" className='btn btn-primary' value={'Add'} />
                </form>

            </div>
        </div>
    );
};

export default MakeAdmin;