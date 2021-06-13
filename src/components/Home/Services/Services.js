import React, { useState } from 'react';
import { useEffect } from 'react';
import hepatitisB from '../../../images/Hepatitis B.jpg';
import ServiceDetail from '../ServiceDetail/ServiceDetail';
import './Services.css'

// const serviceData = [
//     {
//         name: 'Hepatitis B',
//         img: hepatitisB
//     },
//     {
//         name: 'Hepatitis B',
//         img: hepatitisB
//     },
//     {
//         name: 'Hepatitis B',
//         img: hepatitisB
//     }
// ]

const Services = () => {
    const [vaccines, setVaccines] = useState([])

    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/vaccines')
            .then(res => res.json())
            .then(data => setVaccines(data))
    }, [])

    return (
        <section id='getVaccine' className="services mt-5">
            <div className="text-center">
                <h5 style={{ color: '#1CC7C1' }}>OUR SERVICES</h5>
                <h2>Vaccines We Provide</h2>
            </div>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        vaccines.map(vaccine => <ServiceDetail vaccine={vaccine}></ServiceDetail>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Services;