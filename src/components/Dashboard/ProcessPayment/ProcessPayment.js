import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import SimpleCardForm from './SimpleCardForm';
import BkashForm from './BkashForm';
import NagadForm from './NagadForm';

const stripePromise = loadStripe('pk_test_51IurSTF82hAWG1zcX2nNJcogjs1YSwuNpapnJnZX9xMIwQQVZIJplFdTInGnAMWQ5dJyOjA5uOG0wzz9ImkTnjF0000EPrhy9A');

const ProcessPayment = ({ handlePayment, paymentMethod }) => {
    return (
        <>
            <h1>{paymentMethod}</h1>
            {paymentMethod === 'bKash' && <BkashForm handlePayment={handlePayment} />}
            {paymentMethod === 'nagad' && <NagadForm handlePayment={handlePayment} />}
            {paymentMethod === 'creditCard' && <Elements stripe={stripePromise}>
                <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            </Elements>}
        </>
    );
};

export default ProcessPayment;