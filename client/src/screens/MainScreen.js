import React, { useEffect, useState } from 'react';
import { getPeople } from '../services/PeopleServices'

const Header = (props) =>  {

    const [ data, setData ] = useState();

    const getPeopleAsync = async () => {
        return await getPeople();
    }

    return(
        <div>
            <h1>{data}</h1>
            <button onClick={async () => {
                const newData = await getPeopleAsync();
                console.log(newData);
                setData(newData);
            }}>Click me</button>
        </div>
    )
}
export default Header;