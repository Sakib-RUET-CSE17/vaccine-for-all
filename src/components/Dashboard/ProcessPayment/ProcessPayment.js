import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51IurSTF82hAWG1zcX2nNJcogjs1YSwuNpapnJnZX9xMIwQQVZIJplFdTInGnAMWQ5dJyOjA5uOG0wzz9ImkTnjF0000EPrhy9A');

const ProcessPayment = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;