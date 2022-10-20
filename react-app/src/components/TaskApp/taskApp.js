import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import TaskAppSidebar from './TaskAppSidebar/taskAppSidebar.js';
import TaskAppNav from './taskAppNav';
import MainPanel from './MainPanel/mainPanel';
import TaskDetailPanel from './taskDetailPanel';
import ListDetailPanel from './listDetailPanel';
import './taskApp.css';

export default function TaskApp() {

    const { path, url } = useRouteMatch();

    return (<>
        <TaskAppNav />
        <div className='ta-main-body-div'>
            <TaskAppSidebar />
                <Route path={`${path}`}>
                    <MainPanel />
                </Route>
                <Route exact path={`${path}/:filterId/:listId`}>
                    <MainPanel />
                    <ListDetailPanel />
                </Route>
                <Route path={`${path}/:filterId/:listId/:taskId`}>
                    <MainPanel />
                    <TaskDetailPanel />
                </Route>
        </div>
    </>
    )
}
