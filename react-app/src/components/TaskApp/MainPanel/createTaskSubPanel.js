import React, { useState, useEffect } from 'react'
import './createTaskSubPanel.css';

export default function CreateTaskSubPanel() {

    const [ctInput, setCtInput] = useState('');
    const [renderAddTaskButton, setRenderAddTaskButton] = useState(false);

    useEffect(() => {

    }, [ctInput]);

    const handleCtSubmit = (e) => {
        e.preventDefault();
        console.log(ctInput)
        setCtInput('');
    }

    return (
        <div className='ctsp-main-div'>
            <div className='ctsp-ct-input-main'>
                <form onSubmit={handleCtSubmit}>
                    <div className='ctsp-ct-pseudo-input'>
                        <input
                            className='ctsp-ct-input'
                            type='text'
                            placeholder='Add a task...'
                            value={ctInput}
                            onChange={(e) => setCtInput(e.target.value)}
                            onFocus={() => { setRenderAddTaskButton(true) }}
                            onBlur={() => { setRenderAddTaskButton(false) }}
                        />
                    </div>
                    {
                        renderAddTaskButton &&
                        <button
                            className='ctsp-ct-submit-btn'
                            type='submit'
                        >
                            Add Task
                        </button>
                    }
                </form>
            </div>
        </div >
    )
}
