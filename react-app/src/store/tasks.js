// constants
const LOAD_ALL = 'tasks/LOAD_ALL';
const LOAD_ONE = 'tasks/LOAD_ONE';
const CREATE_TASK = 'tasks/CREATE';
const UPDATE_TASK = 'tasks/UPDATE_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';
const ADD_TAG_TASK = 'tasks/ADD_TAG_TASK';
const REMOVE_TAG_TASK = 'tasks/REMOVE_TAG_TASK';

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

const addTagToTaskActionCreator = (taskId, tagId) => ({
    type: ADD_TAG_TASK,
    taskId,
    tagId
})

const removeTagFromTaskActionCreator = (taskId, tagId) => ({
    type: REMOVE_TAG_TASK,
    taskId,
    tagId
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

export const addTagToTask = (taskId, tagId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}/tags/${tagId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        dispatch(addTagToTaskActionCreator(taskId, tagId));
        return { taskId, tagId };
    }

    return response;
}

export const removeTagFromTask = (taskId, tagId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}/tags/${tagId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        dispatch(removeTagFromTaskActionCreator(taskId, tagId));
        return { taskId, tagId };
    }

    return response;
}

const initialState = {
    allTasks: null,
    singleTask: null
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
                ...state,
                allTasks: { ...state.allTasks, [action.newTask.id]: action.newTask }
            }
        case UPDATE_TASK:
            singleTask = state.singleTask ? { ...state.singleTask } : null;
            if (singleTask && singleTask.id === action.updatedTask.id) {
                singleTask = { ...action.updatedTask };
            }
            return {
                allTasks: { ...state.allTasks, [action.updatedTask.id]: { ...action.updatedTask } },
                singleTask,
            }
        case DELETE_TASK:
            singleTask = state.singleTask ? { ...state.singleTask } : null;
            if (singleTask && singleTask.id === action.id) {
                singleTask = null;
            }
            allTasks = { ...state.allTasks }
            delete allTasks[action.id]
            return {
                allTasks,
                singleTask
            }
        case ADD_TAG_TASK:
            singleTask = state.singleTask ? { ...state.singleTask, } : null;
            if (singleTask && singleTask.id === action.taskId) {
                if (!singleTask.tags.includes(action.tagId)) {
                    singleTask.tags.push(action.tagId)
                }
            }
            allTasks = state.allTasks ? { ...state.allTasks } : null;
            if (allTasks && allTasks[action.taskId]) {
                if (!allTasks[action.taskId].tags.includes(action.tagId)) {
                    allTasks[action.taskId].tags.push(action.tagId)
                }
            }
            return { singleTask, allTasks }
        case REMOVE_TAG_TASK:
            singleTask = state.singleTask ? { ...state.singleTask, } : null;
            if (singleTask && singleTask.id === action.taskId) {
                singleTask.tags = singleTask.tags.filter(tagId => tagId !== action.tagId)
            }
            allTasks = state.allTasks ? { ...state.allTasks } : null;
            if (allTasks && allTasks[action.taskId]) {
                allTasks[action.taskId].tags = allTasks[action.taskId].tags.filter(tagId => tagId !== action.tagId)
            }
            return { singleTask, allTasks }
        default:
            return state;
    }
}
