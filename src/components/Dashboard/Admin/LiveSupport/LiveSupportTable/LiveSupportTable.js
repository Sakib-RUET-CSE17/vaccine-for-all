import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../../App';

const LiveSupportTable = ({ clients }) => {
    const [loggedInUser, setLoggedInUser]=useContext(UserContext)

    return (
        <table className="table table-borderless">
            <thead>
                <tr>
                    <th className="text-secondary text-left" scope="col">Sl No</th>
                    <th className="text-secondary" scope="col">Name</th>
                    <th className="text-secondary" scope="col">Email</th>
                    <th className="text-secondary" scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    clients.map((client, index) =>

                        <tr>
                            <td>{index + 1}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>

                            <td>
                                <Link to={`/startChat?name=${loggedInUser.name || loggedInUser.displayName}&email=${client.email}`} className="btn btn-primary">Reply</Link>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default LiveSupportTable;