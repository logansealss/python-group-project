import React, { useState, useEffect, useRef } from 'react'
import DropDownWrapper from '../../DropdownWrapper';
import dueDateIcon from '../../../img/calendar-day.svg';
import startDateIcon from '../../../img/square-caret-right.svg';
import postponeIcon from '../../../img/calendar-plus.svg';
import prioIcon from '../../../img/exclamation.svg';
import listIcon from '../../../img/list.svg';
import repeatIcon from '../../../img/rotate.svg';
import clockIcon from '../../../img/clock.svg';
import locationPin from '../../../img/location-dot.svg';
import userIcon from '../../../img/user.svg';
import checkIcon from '../../../img/check.svg';
import tagIcon from '../../../img/tag.svg';
import minusIcon from '../../../img/minus.svg';
import EliIcon from '../../../img/ellipsis.svg';
import downCaret from '../../../img/caret-down.svg';
import './createTaskSubPanel.css';

export default function CreateTaskSubPanel() {

    const inputRef = useRef(null);
    const formRef = useRef(null);

    const [ctInput, setCtInput] = useState('');
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [list, setList] = useState('');
    const [prio, setPrio] = useState('');
    const [repeat, setRepeat] = useState('');
    const [location, setLocation] = useState('');
    const [estimate, setEstimate] = useState('');
    const [renderAddTaskGrpClass, setRenderAddTaskGrpClass] = useState('ctsp-ratgc-true');
    const [renderTaskFormIconClass, setRenderTaskFormIconClass] = useState('ctsp-ratig-false')

    const ctDiv = document.getElementsByClassName('ctsp-main-div');

    useEffect(() => {
        if (ctInput.length) {
            setRenderTaskFormIconClass('ctsp-ratig-true');
        } else {
            setRenderTaskFormIconClass('ctsp-ratig-false');
        }
        if (ctInput.includes) { }

    }, [ctInput]);

    // const handleDynamicNameInputClick = () => {
    //     inputRef.current.focus();
    // }

    // const formRenderClickListener = document.addEventListener('click', formRenderClickHandler)

    // function formRenderClickHandler(e) {
    //     if (renderAddTaskGrpClass === 'ctsp-ratgc-true' && e.target !== ctDiv){
    //         setRenderAddTaskGrpClass('ctsp-ratgc-false');
    //     }
    // }

    const handleCtSubmit = (e) => {
        e.preventDefault();
        console.log(ctInput)
        setCtInput('');
    }

    const keyDownFn = (e) => {
        if (e.key === '#') { }
    }

    return (
        <form
            onSubmit={handleCtSubmit}
            className='ctsp-form-el'
        >
            <div
                className='ctsp-main-div'
            >
                <div className='ctsp-ut-main-div'>
                    <div className='ctsp-ut-grp-1'>
                        <div className='ctsp-btn-div-solo-single ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={minusIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                    <div className='ctsp-ut-grp-2'>
                        <div className='ctsp-btn-div-left ctsp-ut-btn' >
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={checkIcon}
                            />
                        </div>
                        <div className='ctsp-btn-div-center-solo ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={postponeIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-rt ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={userIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                    <div className='ctsp-ut-grp-3'>
                        <div className='ctsp-btn-div-left ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={prioIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-center-solo ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={dueDateIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-center ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={listIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-rt ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={tagIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                    <div className='ctsp-ut-grp-4'>
                        <div className='ctsp-btn-div-solo-single ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={EliIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className='ctsp-ct-input-main'> */}
                <div className='ctsp-ct-pseudo-input'>
                    {/* <div
                            className='ctsp-dynamic-name-display'
                            onClick={handleDynamicNameInputClick}
                        >
                            {ctInput}
                        </div> */}

                    <input
                        className='ctsp-ct-input'
                        ref={inputRef}
                        type='text'
                        placeholder='Add a task...'
                        value={ctInput}
                        onChange={(e) => setCtInput(e.target.value)}
                        onFocus={() => { setRenderAddTaskGrpClass('ctsp-ratgc-true') }}
                        // onBlur={() => { !ctInput.length && setRenderAddTaskGrpClass('ctsp-ratgc-false') }}
                        onKeyDown={keyDownFn}
                    />
                </div>
                <div
                    className={`ctsp-add-task-grp ${renderAddTaskGrpClass}`}
                >
                    <div className={`ctsp-add-task-grp-icons ${renderTaskFormIconClass}`}>
                        <DropDownWrapper
                            offset='100px'
                            menu={
                                <div className='test-dd-menu'>
                                    <input
                                        type='datetime'
                                    ></input>
                                </div>}
                        >
                            <img
                                className='ctsp-at-icon-style'
                                src={dueDateIcon}
                            />
                        </DropDownWrapper>

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

                {/* </div> */}
            </div >
        </form>
    )
}
