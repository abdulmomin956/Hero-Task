import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query'

const ToDo = () => {
    const [editable, setEditable] = useState(true);
    const [focusEle, setFocusEle] = useState(false);
    const ref = useRef(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    // useEffect(() => {
    //     console.log(title, description)
    // }, [title, description])

    const allData = useQuery('allTask', () => fetch('https://honest-whistler-89456.herokuapp.com/all-data').then(res => res.json()))

    useEffect(() => {
        // console.log(ref?.current?.firstElementChild.childNodes[1].childNodes[0])
        if (focusEle) {
            ref?.current?.firstElementChild.childNodes[1].childNodes[0].focus();
        }
    }, [allData.data, focusEle])

    if (allData.isLoading) {
        return <h1 className='text-center text-lg'>Loading...</h1>
    }

    const handleAdd = (e) => {
        const data = { title: "", description: '' };
        fetch('http://localhost:5000/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.insertedId) {
                    allData.refetch();
                    if (!allData.isLoading) {
                        // console.log(ref.current.firstElementChild)
                        setFocusEle(true)
                    }
                }
            })

    }



    const handleClick = (e) => {
        // console.log(e.target.textContent);
        // console.log(e.target);
        setEditable(true)
    }


    const save = (e) => {
        e.target.parentNode.parentNode.style.background = 'white'
        setFocusEle(false)
        // e.target.parentNode.parentNode.childNodes[1].childNodes[0].style.background = 'white'
        // e.target.parentNode.parentNode.childNodes[1].childNodes[1].style.background = 'white'
        // console.log(e.target.parentNode.children[0].innerText);
        // console.log(e.target.parentNode.children[1].innerText);
        e.target.parentNode.parentNode.childNodes[1].childNodes[0].removeAttribute('placeholder')
        e.target.parentNode.parentNode.childNodes[1].childNodes[1].removeAttribute('placeholder')
        setTitle(e.target.parentNode.children[0].innerText)
        setDescription(e.target.parentNode.children[1].innerText)
        const id = e.target.parentNode.children[2].innerText
        const data = { title, description }
        // console.log(data);
        fetch(`https://honest-whistler-89456.herokuapp.com/update-data/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => console.log(result))
        // e.target.parentNode.children.map(item => console.log(item))

    }
    const editScreen = (e) => {
        // console.log(e.target.parentNode.parentNode.childNodes[1].childNodes[1].placeholder)
        e.target.parentNode.parentNode.style.background = 'rgb(220, 220, 220)'
        // e.target.parentNode.parentNode.childNodes[1].childNodes[0].style.background = 'red'
        // e.target.parentNode.parentNode.childNodes[1].childNodes[1].style.background = 'red'
        e.target.parentNode.parentNode.childNodes[1].childNodes[0].setAttribute('placeholder', 'Title')
        e.target.parentNode.parentNode.childNodes[1].childNodes[1].setAttribute('placeholder', 'Description')
        // e.target.parentNode.parentNode.style.content = Attr("placeholder");
        setTitle(e.target.parentNode.children[0].innerText)
        setDescription(e.target.parentNode.children[1].innerText)
        // e.target.parent
    }
    // (".title").parents('div').css("background", "rgb(220, 220, 220)");
    // console.log(allData);
    // const reverseData = allData?.data.reverse();
    // console.log(reverseData);
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: "DELETE"
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                if (result.deletedCount === 1) {
                    allData.refetch();
                }
            })
    }

    return (
        <div className='container mx-auto text-center my-5'>
            <button onClick={handleAdd} className='btn'>Add a task</button>
            <section ref={ref} className='w-[600px] text-start mx-auto '>
                {
                    allData?.data.map((data, i) => <div
                        className='flex justify-between w-50 mx-auto gap-4 mb-3 task'
                        key={i}>
                        <div className='flex items-center'><input type="checkbox" name="" id="" /></div>
                        <div
                            style={{ width: '80%' }}
                        >
                            <p onClick={handleClick}
                                className="title"
                                // placeholder='Title'
                                onBlur={save}
                                onFocus={editScreen}
                                contentEditable={editable}
                                onInput={(e) => setTitle(e.target.innerText)}
                                // onChange={(e) => setTitle(e.current.innerText)}
                                suppressContentEditableWarning={true}>{data.title}</p>
                            <p onClick={handleClick}
                                className='description'
                                // placeholder='Description'
                                onBlur={save}
                                onFocus={editScreen}
                                contentEditable={editable}
                                onInput={(e) => setDescription(e.target.innerText)}
                                // onChange={(e) => setDescription(e.target.innerText)}
                                suppressContentEditableWarning={true}>{data.description}</p>
                            <span style={{ display: 'none' }}>{data._id}</span>
                        </div>
                        <div><button onClick={() => handleDelete(data._id)} className='btn'>delete</button></div>
                    </div>).reverse()
                }
            </section>
        </div>
    );
};

export default ToDo;