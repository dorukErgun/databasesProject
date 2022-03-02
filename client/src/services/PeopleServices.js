import React from 'react';
import axios from 'axios';

export const getPeople = async () => {
    const result = await axios.get("http://localhost:3000/people")
        .then(res => {
            const people = res.data;
            console.log(people);
        });
}