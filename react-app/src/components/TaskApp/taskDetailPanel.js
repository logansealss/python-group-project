import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleTask } from '../../store/tasks';
import { updateATask } from '../../store/tasks';
import selectMenuTimes from '../../data/selectMenuTimes.json';

// import dueDateIcon from '../../img.calendar-day.svg';
// import startDateIcon from '../../img/square-caret-right.svg';
// import postponeIcon from '../../img/calendar-plus.svg';
// import prioIcon from '../../img/exclamation.svg';
// import listIcon from '../../img/list.svg';
// import repeatIcon from '../../img/rotate.svg';
// import clockIcon from '../../img/clock.svg';
// import locationPin from '../../img/location-dot.svg';
// import userIcon from '../../img/user.svg';
// import checkIcon from '../../img/check.svg';
// import tagIcon from '../../img/tag.svg';
// import minusIcon from '../../img/minus.svg';
// import EliIcon from '../../img/ellipsis.svg';
// import downCaret from '../../img/caret-down.svg';
import './taskDetailPanel.css';

export default function TaskDetailPanel() {

    const params = useParams();
    const { listId, taskId } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleTask(taskId));
    }, [dispatch, taskId]);

    const task = useSelector(state => {
        return state.tasks.singleTask;
    });
    const tags = useSelector(state => {
        return state.tags;
    });
    const lists = useSelector(state => {
        return state.lists;
    });

    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [taskList, setTaskList] = useState(listId);
    const [prio, setPrio] = useState('');
    const [taskTags, setTaskTags] = useState([]);
    const [estimate, setEstimate] = useState('');
    const [estimateUnit, setEstimateUnit] = useState(1)


    useEffect(() => {
        if (task) {
            setTaskName(task.name);
            setDueDate(task.dueDate.split(' ')[0]);
            setDueTime(task.dueDate.split(' ')[1]);
            setStartDate(task.startDate.split(' ')[0]);
            setStartTime(task.startDate.split(' ')[1]);
            setTaskList(task.list);
            setPrio(task.priority);
            setTaskTags(task.tags);
            setEstimate(task.duration);
        }
    }, [task]);


    const handleCtSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: taskName,
            priority: prio,
            start_date: startDate + ' ' + startTime,
            due_date: dueDate + ' ' + dueTime,
            list_id: taskList,
            duration: Math.ceil(estimate * estimateUnit)
        }

        console.log('ct form data: ', data);
        console.log(dispatch(updateATask(task.id, data)))
    }


    if (!task) return null;

    return (task &&
        <div className='tad-main-panel'>
            SingleTask:{' '}
            {JSON.stringify(task)}

            <form
                onSubmit={handleCtSubmit}
                className='ctsp-form-el'
            >
                <div
                    className='ctsp-main-div'
                >
                    {/* <div className='ctsp-ut-main-div'>
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
                </div> */}
                    {/* <div className='ctsp-ct-input-main'> */}
                    <div className='ctsp-ct-pseudo-input'>
                        <input
                            className='ctsp-ct-input'
                            type='text'
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        // onFocus={() => { setRenderAddTaskGrpClass('ctsp-ratgc-true') }}
                        // onBlur={() => { !ctInput.length && setRenderAddTaskGrpClass('ctsp-ratgc-false') }}
                        // onKeyDown={keyDownFn}
                        />
                    </div>
                    <div
                        className={`ctsp-add-task-grp`}
                    >
                        <input
                            className='ctsp-date-input'
                            type='date'
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <select
                            className='ctsp-due-date-input'
                            value={dueTime}
                            onChange={(e) => setDueTime(e.target.value)}
                        >
                            {selectMenuTimes.map((option) =>
                                <option value={option.value}>{option.display}</option>
                            )}
                        </select>
                        <input
                            className='ctsp-date-input'
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <select
                            className='ctsp-due-date-input'
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        >
                            {selectMenuTimes.map((option) =>
                                <option value={option.value}>{option.display}</option>
                            )}
                        </select>

                        <select
                            className='ctsp-prio-input'
                            value={`${prio}`}
                            onChange={(e) => setPrio(Number(e.target.value))}
                        >
                            <option value=''>Priority</option>
                            <option value='1'>High</option>
                            <option value='2'>Med</option>
                            <option value='3'>Low</option>
                            <option value='0'>None</option>
                        </select>
                        <select
                            className='ctsp-list-input'
                            value={taskList}
                            onChange={(e) => setTaskList(e.target.value)}
                        >
                            <option value=''>List</option>
                            {Object.values(lists).map((l) =>
                                <option value={l.id}>{l.name}</option>
                            )}
                        </select>
                        <select
                            className='ctsp-tag-input'
                            multiple
                            value={taskTags}
                            onChange={(e) => setTaskTags(
                                Array.from(e.target.selectedOptions).map((el) => (
                                    el.value)))}
                        >
                            {Object.values(tags).map((t) =>
                                <option value={t.id}>{t.name}</option>
                            )}
                        </select>
                        <input
                            type='number'
                            value={estimate}
                            onChange={(e) => setEstimate(e.target.value)}
                        />

                        <select
                            className='ctsp-prio-input'
                            value={`${estimateUnit}`}
                            onChange={(e) => setEstimateUnit(Number(e.target.value))}
                        >
                            <option value='1'>Minutes</option>
                            <option value='60'>Hours</option>

                        </select>

                        <button
                            className='ctsp-ct-submit-btn'
                            type='submit'
                            disabled={taskName.length ? false : true}
                        >
                            Update Task
                        </button>
                    </div>

                    {/* </div> */}
                </div >
            </form >
        </div>
    )
}
