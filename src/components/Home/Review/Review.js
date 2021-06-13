import React from 'react';

const Review = ({ review }) => {
    const { description, name, email, imageURL } = review;
    return (
        <div className="card shadow-sm col-md-4 mt-1">
            <div className="card-body">
                <p className="card-text text-center">{description}</p>
            </div>
            <div className="card-footer d-flex  align-items-center">
                <img className="mx-3" src={imageURL} alt="" width="60" />
                <div>
                    <h6 className="text-primary">{name}</h6>
                    <p className="m-0">{email}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;