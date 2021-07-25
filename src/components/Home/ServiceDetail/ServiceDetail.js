import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceDetail = ({ vaccineByUpazilla, setVaccineBook }) => {
    const [vaccine, setVaccine] = useState({})
    // const [book, setBook] = useState(false)

    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/vaccine/' + vaccineByUpazilla.vaccine_id)
            .then(res => res.json())
            .then(data => {
                const newVaccine = { ...vaccineByUpazilla, vaccine: data }
                setVaccine(newVaccine)
            })
        // console.log(vaccineByUpazilla)
    }, [vaccineByUpazilla])


    return (

        <div id={''} className="col">
            <Link onClick={() => setVaccineBook(vaccine)}>
                <div className="card h-100">
                    <img src={vaccine.vaccine?.imageURL} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{vaccine.vaccine?.name}</h5>
                        <p className="card-text">Age: {vaccine.vaccine?.ageDuration}</p>
                        <p className="text-warning">Available: {vaccine.available}</p>
                    </div>
                    <div className="card-footer bg-success">
                        <span className='me-5 pe-5'>Tk {vaccine.vaccine?.price}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ServiceDetail;