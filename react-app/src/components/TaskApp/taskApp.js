import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import TaskAppSidebar from './TaskAppSidebar/taskAppSidebar.js';
import TaskAppNav from './taskAppNav';
import MainPanel from './MainPanel/mainPanel';
import TaskDetailPanel from './taskDetailPanel';
import ListDetailPanel from './listDetailPanel';
import NotFound from '../NotFound/NotFound.js';
import './taskApp.css';
import { useSelector } from 'react-redux';
import { SidebarProvider } from '../../context/Sidebar.js';

export default function TaskApp() {

    const user = useSelector(state => state.session.user)

    if (!user) {
        return <Redirect to="/" />
    }

    return (<>
        <SidebarProvider>
            <TaskAppNav />
            <div className='ta-main-body-div'>
                <TaskAppSidebar />
                <Route exact path={'/app'}>
                    <MainPanel />
                </Route>
                <Route exact path={'/app/:filterId/:listId'}>
                    <MainPanel />
                    <ListDetailPanel />
                </Route>
                <Route exact path={'/app/:filterId/:listId/:taskId'}>
                    <MainPanel />
                    <TaskDetailPanel />
                </Route>
            </div>
        </SidebarProvider>
    </>
    )
}
