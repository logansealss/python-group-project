import React, { useState, useEffect } from 'react'
import dueDateIcon from '../../../img/calendar-day.svg';
import startDateIcon from '../../../img/square-caret-right.svg';
import prioIcon from '../../../img/exclamation.svg';
import listIcon from '../../../img/list.svg';
import repeatIcon from '../../../img/rotate.svg';
import clockIcon from '../../../img/clock.svg';
import locationPin from '../../../img/location-dot.svg';
import './createTaskSubPanel.css';

export default function CreateTaskSubPanel() {

    const [ctInput, setCtInput] = useState('');
    const [renderAddTaskGrpClass, setRenderAddTaskGrpClass] = useState('ctsp-ratgc-false');

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
                <form
                    onSubmit={handleCtSubmit}
                    className='ctsp-form-el'
                >
                    <div className='ctsp-ct-pseudo-input'>
                        <input
                            className='ctsp-ct-input'
                            type='text'
                            placeholder='Add a task...'
                            value={ctInput}
                            onChange={(e) => setCtInput(e.target.value)}
                            onFocus={() => { setRenderAddTaskGrpClass('ctsp-ratgc-true') }}
                            onBlur={() => { !ctInput.length && setRenderAddTaskGrpClass('ctsp-ratgc-false') }}
                        />
                    </div>
                    <div
                        className={`ctsp-add-task-grp ${renderAddTaskGrpClass}`}
                        onClick={() => { !ctInput.length && setRenderAddTaskGrpClass('ctsp-ratgc-false') }}
                    >
                        <div className='ctsp-add-task-grp-icons'>
                            <img className='ctsp-at-icon-style' src={dueDateIcon} />
                            <img className='ctsp-at-icon-style' src={startDateIcon} />
                            <img className='ctsp-at-icon-style' src={listIcon} />
                            <img className='ctsp-at-icon-style' src={prioIcon} />
                            <img className='ctsp-at-icon-style' src={repeatIcon} />
                            <img className='ctsp-at-icon-style' src={locationPin} />
                            <img className='ctsp-at-icon-style' src={clockIcon} />
                        </div>
                        <button
                            className='ctsp-ct-submit-btn'
                            type='submit'
                            disabled={ctInput.length ? false : true}
                        >
                            Add Task
                        </button>
                    </div>

                </form>
            </div>
        </div >
    )
}
