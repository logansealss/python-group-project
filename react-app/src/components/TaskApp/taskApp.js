import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import TaskAppSidebar from './taskAppSidebar';
import TaskAppNav from './taskAppNav';
import TaskAppMainPanel from './taskAppMainPanel';
import TaskAppDetailPanel from './taskAppDetailPanel';
import TaskAppListDetailPanel from './taskAppListDetailPanel';
import './taskApp.css';

export default function TaskApp() {

    const { path, url } = useRouteMatch();

    return (<>
        <TaskAppNav />
        <div className='ta-main-body-div'>
            <TaskAppSidebar />
            <TaskAppMainPanel />
                <Route exact path={`${path}/:listId`}>
                    <TaskAppListDetailPanel />
                </Route>
                <Route path={`${path}/:listId/:taskId`}>
                    <TaskAppDetailPanel />
                </Route>
        </div>
    </>
    )
}
