import React from 'react';
import TaskAppSidebar from './taskAppSidebar';
import TaskAppNav from './taskAppNav';
import TaskAppMainPanel from './taskAppMainPanel';
import TaskAppDetailPanel from './taskAppDetailPanel';
import './taskApp.css';

export default function TaskApp() {
    return (<>
        <TaskAppNav />
        <div className='ta-main-body-div'>

            <TaskAppSidebar />
            <TaskAppMainPanel />
            <TaskAppDetailPanel />
        </div>
        </>
    )
}
