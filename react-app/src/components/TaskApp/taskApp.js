import React from 'react';
import TaskAppSidebar from './taskAppSidebar';
import TaskAppNav from './taskAppNav';
import './taskApp.css';

export default function TaskApp() {
    return (<>
            <TaskAppNav />
        <div className='ta-main-body-div'>

            <TaskAppSidebar />
        </div>
        </>
    )
}
