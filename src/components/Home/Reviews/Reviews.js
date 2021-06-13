import React, { useEffect } from 'react';
import wilson from '../../../images/wilson.png';
import ema from '../../../images/ema.png';
import aliza from '../../../images/aliza.png';
import Review from '../Review/Review';
import './Reviews.css'
import { useState } from 'react';

// const reviewData = [
//     {
//         quote : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non architecto nobis, adipisci recusandae repellat accusantium consequuntur, qui nisi deserunt blanditiis mollitia, illo! ',
//         name : 'Wilson Harry',
//         from : 'California',
//         img : wilson
//     },
//     {
//         quote : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non architecto nobis, adipisci recusandae repellat accusantium consequuntur, qui nisi deserunt blanditiis mollitia, illo! ',
//         name : 'Ema Gomez',
//         from : 'California',
//         img : ema
//     },
//     {
//         quote : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non architecto nobis, adipisci recusandae repellat accusantium consequuntur, qui nisi deserunt blanditiis mollitia, illo! ',
//         name : 'Aliza Farari',
//         from : 'California',
//         img : aliza
//     },
//     {
//         quote : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic non architecto nobis, adipisci recusandae repellat accusantium consequuntur, qui nisi deserunt blanditiis mollitia, illo! ',
//         name : 'Aliza Farari',
//         from : 'California',
//         img : aliza
//     }
// ]

const Reviews = () => {
    const [reviewData,setReviewData]=useState([])

    useEffect(()=>{
        fetch('https://young-citadel-36577.herokuapp.com/reviews')
        .then(res=>res.json())
        .then(data=>setReviewData(data))
    },[])
    return (
        <section className="reviews my-5 py-5">
           <div className="container">
               <div className="section-header">
                   <h5 className="text-primary text-uppercase">Review</h5>
                   <h1>What Our People <br/> Say</h1>
               </div>
               <div className="card-deck mt-5 row m-1">
                    {
                        reviewData.map(review => <Review review={review}/>)
                    }
                </div>
           </div>
       </section>
    );
};

export default Reviews;