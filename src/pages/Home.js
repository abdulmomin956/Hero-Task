import React from 'react';
import ToDo from './ToDo';

const Home = () => {
    return (
        <div>

            <h1 className="text-3xl font-bold underline text-center">
                My Task
            </h1>
            <ToDo></ToDo>
        </div>
    );
};

export default Home;