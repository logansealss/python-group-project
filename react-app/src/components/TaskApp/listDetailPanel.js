import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './listDetailPanel.css'

function getDateFromToday(daysForward = 0) {
  let res = new Date();
  res = res.setHours(0, 0, 0, 0);
  res = new Date(res);
  res.setDate(res.getDate() + daysForward)
  res = res.toISOString();
  res = res.replace('T', ' ')
  res = res.slice(0, 10)
  return res;
}

function getListDetails(tasks, startDate, dueDate) {

  let tasksToCheck = Object.values(tasks)

  let result = {
    tasks: 0,
    overdueTasks: 0,
    completedTasks: 0,
    estimatedTime: 0
  }

  const currentDate = getDateFromToday();

  return tasksToCheck.reduce((result, task) => {

    let taskDueDate = task.dueDate ? task.dueDate.slice(0, 10) : task.dueDate

    if (startDate === undefined
      || (taskDueDate >= startDate && taskDueDate <= dueDate)) {

      result.tasks++;
      if (task.completed) {
        result.completedTasks++;
      }
      if (task.duration > 0) {
        result.estimatedTime += task.duration
      }
    }

    if (taskDueDate < currentDate && dueDate !== getDateFromToday(1) && !task.completed) {
      result.tasks++;
      result.overdueTasks++;
      if (task.duration > 0) {
        result.estimatedTime += task.duration
      }
    }

    return result
  }, result)
}

export default function ListDetailPanel() {

  const { listId } = useParams();
  const tasks = useSelector(state => state.tasks.allTasks)
  const lists = useSelector(state => state.lists)

  let listDetails = null;

  if (listId === "all") {
    listDetails = getListDetails(tasks)
    listDetails.name = "All Tasks"
  } else if (listId === "today") {
    listDetails = getListDetails(tasks, getDateFromToday(), getDateFromToday())
    listDetails.name = "Today"
  } else if (listId === "tomorrow") {
    listDetails = getListDetails(tasks, getDateFromToday(1), getDateFromToday(1))
    listDetails.name = "Tomorrow"
  } else if (listId === "week") {
    listDetails = getListDetails(tasks, getDateFromToday(), getDateFromToday(6))
    listDetails.name = "This Week"
  }

  return (listDetails &&
    <div>
      <div id="list-details-name">
        {listDetails.name}
      </div>
      <div id="list-details-data-container">
        <div className="list-details-data">
          <div>
            <div 
              className='list-details-data-value'
              id='list-details-tasks'
             >
              {listDetails.tasks}
            </div>
            <div className='list-details-data-label'>
              tasks
            </div>
          </div>
        </div>
        {!!listDetails.overdueTasks &&
          <div class="list-details-data">
            <div>
              <div 
                className='list-details-data-value'
                id='list-details-overdue'
              >
                {listDetails.overdueTasks}
              </div>
              <div className='list-details-data-label'>
                overdue
              </div>
            </div>
          </div>
        }
        <div 
          className="list-details-data"
          id="list-details-completed"
        >
          <div>
            <div className='list-details-data-value'>
              {listDetails.completedTasks}
            </div>
            <div className='list-details-data-label'>
              completed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
