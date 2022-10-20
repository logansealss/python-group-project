import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getListDetails } from '../../utils/taskLists'
import './listDetailPanel.css'

export default function ListDetailPanel() {

  const params = useParams();

  const tasks = useSelector(state => state.tasks.allTasks)
  const lists = useSelector(state => state.lists)
  const tags = useSelector(state => state.tags)

  let listDetails = getListDetails(params, tasks, lists, tags)

  if (typeof listDetails === "string") {
    return <Redirect to={listDetails}></Redirect>
  }

  return (tasks && lists && tags && listDetails &&
    <div>
      <div id='list-details-name-container'>
        <div id="list-details-name">
          {listDetails.name}
        </div>
      </div>
      <div id="list-details-data-container">
        <div className="list-details-data">
          <div>
            <div
              className='list-details-data-value'
              id='list-details-tasks'
            >
              {listDetails.tasks.length}
            </div>
            <div className='list-details-data-label'>
              {listDetails.tasks.length === 1 ? 'task' : 'tasks'}
            </div>
          </div>
          {!!listDetails.estimatedTime &&
            <div
              id="list-details-estimated-time"
            >
              <div
                className='list-details-data-value'
              >
                {!!Math.floor(listDetails.estimatedTime / 60) && (
                  <>
                    <span>
                      {Math.floor(listDetails.estimatedTime / 60)}
                    </span>
                    <small>
                      {Math.floor(listDetails.estimatedTime / 60) === 1 ? 'hr ' : 'hrs '}
                    </small>
                  </>
                )}
                {!!(listDetails.estimatedTime % 60) &&
                  <>
                    <span>
                      {listDetails.estimatedTime % 60}
                    </span>
                    <small>
                      min
                    </small>
                  </>
                }
              </div>
              <div className='list-details-data-label'>
                estimated
              </div>
            </div>
          }
        </div>
        <div className="list-details-data">
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
        <div
          className="list-details-data"
          id="list-details-completed"
        >
          <div>
            <div className='list-details-data-value'>
              {listDetails.completedTasks.length}
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
