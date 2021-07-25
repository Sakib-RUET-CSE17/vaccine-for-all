import React, { useEffect, useState } from 'react';

const LocationForm = ({ handleSubmit, searchInfo, setSearchInfo }) => {
    const [divisions, setDivisions] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazillas, setUpazillas] = useState([])


    useEffect(() => {
        fetch('https://bdapis.herokuapp.com/api/v1.1/divisions')
            .then(res => res.json())
            .then(data => setDivisions(data.data))
    }, [])

    useEffect(() => {
        fetch('https://bdapis.herokuapp.com/api/v1.1/division/' + searchInfo.division)
            .then(res => res.json())
            .then(data => setDistricts(data.data))
    }, [searchInfo.division])

    useEffect(() => {
        const districtObject = districts.find(district => district._id === searchInfo.district)
        // console.log(districtObject?.upazilla)
        setUpazillas(districtObject?.upazilla)
    }, [searchInfo])

    const handleChange = e => {
        const newSearchInfo = { ...searchInfo }

        newSearchInfo[e.target.name] = e.target.value
        setSearchInfo(newSearchInfo)
    }
    return (
        <div className="container">
            <div className=' text-center'>
                <form onSubmit={handleSubmit} className="row" action="">
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
                    <div className="col-md-3">
                        <input className="btn btn-success" type="submit" value="Search" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LocationForm;