import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import TaskAppSidebar from './taskAppSidebar/taskAppSidebar';
import TaskAppNav from './taskAppNav';
import MainPanel from './mainPanel';
import TaskDetailPanel from './taskDetailPanel';
import ListDetailPanel from './listDetailPanel';
import './taskApp.css';

export default function TaskApp() {

    const { path, url } = useRouteMatch();

    return (<>
        <TaskAppNav />
        <div className='ta-main-body-div'>
            <TaskAppSidebar />
            <MainPanel />
                <Route exact path={`${path}/:listId`}>
                    <ListDetailPanel />
                </Route>
                <Route path={`${path}/:listId/:taskId`}>
                    <TaskDetailPanel />
                </Route>
        </div>
    </>
    )
}
