import React from 'react';
import { Link } from 'react-router-dom';

const ServiceDetail = ({ vaccine }) => {
    const { name, ageDuration, price, imageURL, _id } = vaccine
    return (

        <div id={''} className="col">
            <Link to={`/book/${_id}`}>
                <div className="card h-100">
                    <img src={imageURL} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">Age: {ageDuration}</p>
                    </div>
                    <div className="card-footer bg-success">
                        <span className='me-5 pe-5'>Tk {price}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ServiceDetail;