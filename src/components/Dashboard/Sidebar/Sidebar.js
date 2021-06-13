import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faCalendar, faGripHorizontal, faUsers, faUserPlus, faSyringe, faTasks, faHome, faList } from '@fortawesome/free-solid-svg-icons';
import { faComments, faFileAlt } from '@fortawesome/free-regular-svg-icons'
import { UserContext } from '../../../App';

const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        fetch('https://young-citadel-36577.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data))
    }, [loggedInUser])
    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4" style={{ height: "100vh" }}>
            <ul className="list-unstyled">
                {isAdmin ? <div>
                    <li>
                        <Link to="/orderList" className="text-white">
                            <FontAwesomeIcon icon={faCalendar} /> <span>Order list</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/addVaccine" className="text-white">
                            <FontAwesomeIcon icon={faSyringe} /> <span>Add Vaccine</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/makeAdmin" className="text-white">
                            <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/manageVaccines" className="text-white">
                            <FontAwesomeIcon icon={faTasks} /> <span>Manage Vaccines</span>
                        </Link>
                    </li>
                </div>
                    :
                    <div>
                        <li>
                            <Link to="/book" className="text-white" >
                                <FontAwesomeIcon icon={faSyringe} /> <span>Book</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="text-white" >
                                <FontAwesomeIcon icon={faList} /> <span>Booking list</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/addReview" className="text-white" >
                                <FontAwesomeIcon icon={faComments} /> <span>Review</span>
                            </Link>
                        </li>
                    </div>
                }
            </ul>
            <div>
                <Link to="/" className="text-white"><FontAwesomeIcon icon={faHome} /> <span>Home</span></Link>
            </div>
        </div>
    );
};

export default Sidebar;