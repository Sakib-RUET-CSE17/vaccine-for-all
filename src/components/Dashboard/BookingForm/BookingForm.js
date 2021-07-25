import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './BookingForm.css'

const BookingForm = ({ vaccine }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [bookingData, setBookingData] = useState(null)

  const onSubmit = data => {
    // console.log(data)
    setBookingData(data)
  };

  const handlePaymentSuccess = paymentId => {
    const orderDetails = {
      name: loggedInUser.name || loggedInUser.displayName,
      email: loggedInUser.email,
      vaccine: vaccine.vaccine.name,
      vaccineUpazillaRelationId:vaccine._id,
      bookingData,
      paymentId,
      orderTime: new Date(),
      status: 'pending'
    }
    fetch('https://young-citadel-36577.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          fetch('https://young-citadel-36577.herokuapp.com/updateStock/' + vaccine._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ available: vaccine.available - 1 })
          })
            .then(res => res.json())
            .then(data => {
              alert('Registered Successfully')
            })

        }
      })
  }
  return (
    <div className="row">
      <div style={{ display: bookingData ? 'none' : 'block' }} className="col-md-6">
        <h1>Register</h1>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" defaultValue={loggedInUser.name || loggedInUser.displayName} {...register("name", { required: true })} placeholder="Your Name" className="form-control" />
          {errors.name && <span className="error">Name is required</span>}

          <input type="text" defaultValue={loggedInUser.email} {...register('email', { required: true })} placeholder="Your Email" className="form-control" />
          {errors.email && <span className="error">Email is required</span>}

          <input type="text" defaultValue={vaccine.division} {...register("division", { required: true })} placeholder="Your Division" className="form-control" />
          {errors.name && <span className="error">Division is required</span>}

          <input type="text" defaultValue={vaccine.district} {...register("district", { required: true })} placeholder="Your District" className="form-control" />
          {errors.name && <span className="error">District is required</span>}

          <input type="text" defaultValue={vaccine.upazilla} {...register("upazilla", { required: true })} placeholder="Your Upazilla" className="form-control" />
          {errors.name && <span className="error">Upazilla is required</span>}

          <h5>{vaccine.vaccine?.name} - BDT {vaccine.vaccine?.price}</h5>
          <input type="submit" value="Confirm" />
        </form>
      </div>
      <div style={{ display: bookingData ? 'block' : 'none' }} className="col-md-6">
        <h2>Please Pay BDT {vaccine.price}</h2>
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default BookingForm;