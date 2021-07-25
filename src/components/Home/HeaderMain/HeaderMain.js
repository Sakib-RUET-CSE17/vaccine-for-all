import React from 'react';
import { Link } from 'react-router-dom';

const HeaderMain = () => {
    return (
        <main style={{ height: '600px' }} className="row d-flex align-items-center">
            <div className="col-md-4 col-md-6 col-12 offset-md-1">
                <h1 style={{ color: '#3A4256' }}>Get Your Vaccines <br /> Here</h1>
                <p className="text-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore eveniet necessitatibus et iusto corrupti minima.</p>
                <Link to="/getVaccine" className='btn btn-primary'>GET VACCINE</Link>
            </div>
            <div className="col-md-6">
                {/* <img src={chair} alt="" className="img-fluid" /> */}
            </div>
        </main>
    );
};

export default HeaderMain;