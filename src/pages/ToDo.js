import React, { useState } from 'react';
import { useQuery } from 'react-query'

const ToDo = () => {
    const [editable, setEditable] = useState(true);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const allData = useQuery('allTask', () => fetch('https://honest-whistler-89456.herokuapp.com/all-data').then(res => res.json()))
    if (allData.isLoading) {
        return <h1 className='text-center text-lg'>Loading...</h1>
    }
    const data = { title: "", description: '' };
    const handleAdd = () => {
        fetch('https://honest-whistler-89456.herokuapp.com/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => console.log(result))

    }
    const handleClick = (e) => {
        // console.log(e.target.textContent);
        // console.log(e.target);
        setEditable(true)
    }
    fetch(() => {
        console.log(title, description)
    }, [title, description])

    const save = (e) => {
        e.target.parentNode.parentNode.style.background = 'white'
        // console.log(e.target.parentNode.children[0].innerText);
        // console.log(e.target.parentNode.children[1].innerText);
        setTitle(e.target.parentNode.children[0].innerText)
        setDescription(e.target.parentNode.children[1].innerText)
        const data = { title, description }
        console.log(data);
        fetch('')
        // e.target.parentNode.children.map(item => console.log(item))

    }
    const editScreen = (e) => {
        // console.log(e.target.parentNode.parentNode.style.background)
        e.target.parentNode.parentNode.style.background = 'rgb(220, 220, 220)'
        // e.target.parent
    }
    // (".title").parents('div').css("background", "rgb(220, 220, 220)");
    // console.log(allData);
    return (
        <div className='container mx-auto text-center my-5'>
            <button onClick={handleAdd} className='btn'>Add a task</button>
            <section className='w-[600px] text-start mx-auto '>
                {
                    allData?.data?.map((data, i) => <div
                        className='flex justify-evenly w-50 mx-auto gap-4 mb-3 task'
                        key={i}>
                        <div><input type="checkbox" name="" id="" /></div>
                        <div

                        >
                            <p onClick={handleClick}
                                className="title"
                                onBlur={save}
                                onFocus={editScreen}
                                contentEditable={editable}
                                onInput={(e) => setDescription(e.target.value)}
                                onChange={(e) => setTitle(e.current.value)}
                                suppressContentEditableWarning={true}>{data.title}</p>
                            <p onClick={handleClick}
                                className='description'
                                onBlur={save}
                                onFocus={editScreen}
                                contentEditable={editable}
                                onChange={(e) => setDescription(e.target.value)}
                                suppressContentEditableWarning={true}>{data.description}</p>
                            <span style={{ display: 'none' }}>{data._id}</span>
                        </div>
                        <div><button className='btn'>delete</button></div>
                    </div>)
                }
            </section>
        </div>
    );
};

export default ToDo;