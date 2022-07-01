import React from 'react';

const ToDo = () => {
    const data = { title: "", description: '' };
    const handleAdd = () => {
        fetch('http://localhost:5000/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => console.log(result))

    }
    return (
        <div className='container mx-auto flex flex-row justify-center my-5'>
            <button onClick={handleAdd} className='btn'>Add a task</button>
        </div>
    );
};

export default ToDo;