import React, { useState } from 'react';
import { useEffect } from 'react';
import Book from '../../Dashboard/Book/Book';
import LocationForm from '../../Shared/LocationForm/LocationForm';
import ServiceDetail from '../ServiceDetail/ServiceDetail';
import './Services.css'

const Services = () => {
    const [vaccineBook, setVaccineBook] = useState({})
    const [vaccinesByUpazilla, setVaccinesByUpazilla] = useState([])
    const [searchInfo, setSearchInfo] = useState({})

    // useEffect(() => {
    //     fetch('https://young-citadel-36577.herokuapp.com/vaccines')
    //         .then(res => res.json())
    //         .then(data => setVaccines(data))
    // }, [])

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

    // console.log(vaccinesByUpazilla)
    console.log('to be booked', vaccineBook)

    return (
        vaccineBook.vaccine_id ?
            <Book vaccine={vaccineBook}></Book> :
            <section id='getVaccine' className="services mt-5">
                <div className="text-center">
                    <h5 style={{ color: '#1CC7C1' }}>OUR SERVICES</h5>
                    <h2>Vaccines We Provide</h2>
                </div>
                <LocationForm handleSubmit={handleSubmit} searchInfo={searchInfo} setSearchInfo={setSearchInfo}></LocationForm>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {
                            vaccinesByUpazilla.map(vaccineByUpazilla => <ServiceDetail vaccineByUpazilla={vaccineByUpazilla} setVaccineBook={setVaccineBook}></ServiceDetail>)
                        }
                    </div>
                </div>
            </section>
    );
};

export default Services;