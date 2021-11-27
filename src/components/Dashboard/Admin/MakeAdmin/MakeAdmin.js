import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import LocationSelect from './LocationSelect';

const MakeAdmin = () => {
    const [newAdmin, setNewAdmin] = useState({});
    const [loggedInUser,] = useContext(UserContext);

    const handleChange = (event) => {
        const previous = { ...newAdmin };
        previous[event.target.name] = event.target.value;
        setNewAdmin(previous);
    }

    const handleSubmit = (e) => {
        console.log(newAdmin, loggedInUser);
        fetch('https://young-citadel-36577.herokuapp.com/isCentralAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log('central admin', data)
                if (data) {
                    fetch('https://young-citadel-36577.herokuapp.com/addAdmin', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(newAdmin)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                alert(`${newAdmin.email} has been added as admin`)
                            }
                        })
                }
                else {
                    alert(`Only central admin can add new admin!`);
                }
            })

        e.preventDefault();
    }
    return (
        <div className="row">
            <div className="col-md-2 border border-primary">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-5 text-center border border-primary m-auto mt-5">
                <form onSubmit={handleSubmit} >
                    <input type="text" className='form-control' name="email" onChange={handleChange} placeholder='Email address' required />
                    <br />
                    <label className="input-group-text" for="adminType">Admin Type</label>
                    <select className="form-select" id="adminType" name="adminType" onChange={handleChange} required>
                        <option value="central">Central</option>
                        <option value="local">Local</option>
                    </select>
                    <br />
                    {
                        newAdmin.adminType === 'local' &&
                        <LocationSelect handleChange={handleChange} newAdmin={newAdmin} />
                    }
                    <input type="submit" className='btn btn-primary' value={'Add'} />
                </form>

            </div>
        </div>
    );
};

export default MakeAdmin;