import React from 'react';
import ToDo from './ToDo';

const Home = () => {
    return (
        <div>
            This is home
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <ToDo></ToDo>
        </div>
    );
};

export default Home;