import React, { useEffect, useState } from 'react';

const LocationSelect = ({ handleChange, newAdmin }) => {
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazillas, setUpazillas] = useState([])


    useEffect(() => {
        fetch('https://bdapis.herokuapp.com/api/v1.1/divisions')
            .then(res => res.json())
            .then(data => setDivisions(data.data))
    }, [])

    useEffect(() => {
        fetch('https://bdapis.herokuapp.com/api/v1.1/division/' + newAdmin.division)
            .then(res => res.json())
            .then(data => setDistricts(data.data))
    }, [newAdmin.division])

    useEffect(() => {
        const districtObject = districts.find(district => district._id === newAdmin.district)
        // console.log(districtObject?.upazilla)
        setUpazillas(districtObject?.upazilla)
    }, [newAdmin.district]);

    return (
        <div className="container">
            <div className=' text-center row'>
                <div className="col-md-3">
                    <strong>Division: </strong>
                    <select name='division' onBlur={handleChange} className="">
                        {
                            divisions.map(division => <option value={division._id} label={division.division}></option>)
                        }
                    </select>
                </div>
                <div className="col-md-3">
                    <strong>District: </strong>
                    <select name='district' onBlur={handleChange} className="">
                        {
                            districts.map(district => <option value={district._id} label={district.district}></option>)
                        }
                    </select>
                </div>
                <div className="col-md-3">
                    <strong>Upazilla: </strong>
                    <select name='upazilla' onBlur={handleChange} className="">
                        {
                            upazillas?.map(upazilla => <option value={upazilla} label={upazilla}></option>)
                        }
                    </select>
                </div>
            </div>
        </div>
    );
};

export default LocationSelect;