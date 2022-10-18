// constants
const LOAD_ALL = 'tasks/LOAD_ALL';
const LOAD_ONE = 'tasks/LOAD_ONE';

const loadAll = allTasks => ({
    type: LOAD_ALL,
    allTasks
});

const loadOne = singleTask => ({
    type: LOAD_ONE,
    singleTask
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
        console.log('alltasks thunk: ', allTasks)
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
        default:
            return state;
        }
    }