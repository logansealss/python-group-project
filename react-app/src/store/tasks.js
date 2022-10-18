// constants
const LOAD_ALL = 'tasks/LOAD_ALL';
const LOAD_ONE = 'tasks/LOAD_ONE';
const CREATE_TASK = 'tasks/CREATE';
const UPDATE_TASK = 'tasks/UPDATE_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';

const loadAll = allTasks => ({
    type: LOAD_ALL,
    allTasks
});

const loadOne = singleTask => ({
    type: LOAD_ONE,
    singleTask
});

const createTask = newTask => ({
    type: CREATE_TASK,
    newTask
});

const updateTask = updatedTask => ({
    type: UPDATE_TASK,
    updatedTask
})

const deleteTask = id => ({
    type: DELETE_TASK,
    id
})

export const getAllTasks = () => async (dispatch) => {
    const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const allTasks = await response.json();
        dispatch(loadAll(allTasks));
        return allTasks;
    }
    return response;
}


export const getSingleTask = (id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const singleTask = await response.json();
        dispatch(loadOne(singleTask));
        return singleTask;
    }
    return response;
}

export const createNewTask = (task) => async (dispatch) => {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    });

    if (response.ok) {
        const newTask = await response.json();
        dispatch(createTask(newTask));
        return newTask;
    }
    return response;
}

export const updateATask = (id, task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    });

    if (response.ok) {
        const updatedTask = await response.json();
        dispatch(updateTask(updatedTask));
        return updatedTask;
    }
    return response;
}

export const deleteSingleTask = (id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        dispatch(deleteTask(id));
        return id;
    }

    return response;
}

const initialState = {
                        allTasks: {},
                        singleTask: {}
                    };

export const taskReducer = (state = initialState, action) => {
    let singleTask;
    let allTasks;
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, allTasks: action.allTasks }
        case LOAD_ONE:
            return { ...state, singleTask: action.singleTask }
        case CREATE_TASK:
            return { 
                    singleTask: { ...state.singleTask },
                    allTasks: { ...state.allTasks, [action.newTask.id]: action.newTask }
                }
        case UPDATE_TASK:
            singleTask = { ...state.singleTask };
            if (state.singleTask.id && state.singleTask.id === action.updatedTask.id){
                singleTask = action.updatedTask;
            }
            return {
                allTasks: { ...state.allTasks, [action.updatedTask.id]: action.updatedTask },
                singleTask,
            }
        case DELETE_TASK:
            singleTask = (state.singleTask.id && state.singleTask.id === action.id) ? 
                {} : 
                { ...state.singleTask };
            allTasks = { ...state.allTasks }
            delete allTasks[action.id]
            return {
                allTasks,
                singleTask
            }
        default:
            return state;
        }
    }
