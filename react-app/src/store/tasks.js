// constants
const LOAD_ALL = 'tasks/LOAD_ALL';
const LOAD_ONE = 'tasks/LOAD_ONE';
const CREATE_TASK = 'tasks/CREATE'

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
    return null;
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
    return null;
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
    return null;
}

const initialState = {
                        allTasks: {},
                        singleTask: {}
                    };

export const taskReducer = (state = initialState, action) => {
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
        default:
            return state;
        }
    }
