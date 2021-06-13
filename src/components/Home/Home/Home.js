import React from 'react';
import FeaturedService from '../FeaturedService/FeaturedService';
import Header from '../Header/Header';
import Reviews from '../Reviews/Reviews';
import Services from '../Services/Services';
import VaccineRegistration from '../VaccineRegistration/VaccineRegistration';
import Blogs from '../Blogs/Blogs';
import Footer from '../../Shared/Footer/Footer';


const Home = () => {
    return (
        <div>
            <Header></Header>
            <Services></Services>
            <FeaturedService></FeaturedService>
            <VaccineRegistration></VaccineRegistration>
            <Reviews></Reviews>
            <Blogs></Blogs>
            {/* <Doctors></Doctors>
            <Contact></Contact> */}
            <Footer></Footer>
        </div>
    );
};

export default Home;