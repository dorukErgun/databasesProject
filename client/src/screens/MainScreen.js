import React, { useEffect } from 'react';
import { getPeople } from '../services/PeopleServices'

const Header = (props) =>  {

    const getPeopleAsync = async () => {
        return await getPeople();
    }

    useEffect(() => {
        //Runs on every render
        getPeopleAsync();
    });

    return(
        <div>
            <h1>Hello there.</h1>
        </div>
    )
}
export default Header;