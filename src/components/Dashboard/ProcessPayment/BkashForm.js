import React from 'react';
import { useForm } from "react-hook-form";

const BkashForm = ({ handlePayment }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => { handlePayment(data.trxnId) };

    return (
        <>
            <p>Send money to account: 01XXXXXXXXX</p>
            <p>Please, enter Trxn ID</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("trxnId", { required: true })} placeholder="Trxn ID" />
                {errors.trxnId && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </>
    );
};

export default BkashForm;