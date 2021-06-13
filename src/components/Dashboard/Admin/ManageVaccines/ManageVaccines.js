import React, { useEffect, useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import VaccineCard from '../VaccineCard/VaccineCard';

const ManageVaccines = () => {
    const [vaccines, setVaccines] = useState([])

    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/vaccines')
            .then(res => res.json())
            .then(data => setVaccines(data))
    }, [])
    return (
        <div className="row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10">
                <h1>Manage Vaccines</h1>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {
                        vaccines.map(vaccine => <VaccineCard vaccine={vaccine}></VaccineCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageVaccines;