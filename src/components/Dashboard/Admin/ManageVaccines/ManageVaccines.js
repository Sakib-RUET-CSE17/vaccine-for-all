import React, { useEffect, useState } from 'react';
import LocationForm from '../../../Shared/LocationForm/LocationForm';
import Sidebar from '../../Sidebar/Sidebar';
import VaccineCard from '../VaccineCard/VaccineCard';

const ManageVaccines = () => {
    const [vaccinesByUpazilla, setVaccinesByUpazilla] = useState([])

    const [searchInfo, setSearchInfo] = useState({})

    const handleSubmit = (e) => {
        console.log('submitted', searchInfo)

        fetch('https://young-citadel-36577.herokuapp.com/vaccineByUpazilla', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchInfo)
        })
            .then(res => res.json())
            .then(data => {
                setVaccinesByUpazilla(data)
            })

        e.preventDefault()
    }

    return (
        <div className="row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10">
                <h6>Manage Vaccines</h6>
                <div>
                <LocationForm handleSubmit={handleSubmit} searchInfo={searchInfo} setSearchInfo={setSearchInfo}></LocationForm>
                </div>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {
                        vaccinesByUpazilla.map(vaccineByUpazilla => <VaccineCard vaccineByUpazilla={vaccineByUpazilla}></VaccineCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageVaccines;