import React from 'react';
import './VaccineRegistration.css'

const VaccineRegistration = () => {
    return (
        <section className="vaccine-registration">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 py-5">
                        <h5 className="text-primary text-uppercase ">Vaccine Registration</h5>
                        <h1 className="my-4 text-success">Register for Vaccine <br /> Today</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque magnam ad consequuntur assumenda saepe hic amet nemo ea facere a!</p>
                        <button className="btn btn-primary">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VaccineRegistration;