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
        dispatch(loadAll(allTasks));
        return allTasks;
    }
    return null;
}

const initialState = {
                        allTasks: {},
                        singleTask: {}
                    };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL:
            return { ...state, allTasks: action.allTasks }
        case LOAD_ONE:
            return { ...state, singleTask: action.singleTask }
        default:
            return state;
        }
    }
