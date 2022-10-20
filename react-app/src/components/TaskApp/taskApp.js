import React from 'react';
import { Redirect, Route, useRouteMatch } from 'react-router-dom';
import TaskAppSidebar from './TaskAppSidebar/taskAppSidebar.js';
import TaskAppNav from './taskAppNav';
import MainPanel from './MainPanel/mainPanel';
import TaskDetailPanel from './taskDetailPanel';
import ListDetailPanel from './listDetailPanel';
import './taskApp.css';
import { useSelector } from 'react-redux';
import { SidebarProvider } from '../../context/SidebarExpander.js';

export default function TaskApp() {

    const user = useSelector(state => state.session.user)

    const { path, url } = useRouteMatch();

    if(!user){
        return <Redirect to="/" />
    }

    return (<>
        <SidebarProvider>
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
        </SidebarProvider>
    </>
    )
}
