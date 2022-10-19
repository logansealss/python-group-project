// constants
const LOAD_ALL = 'lists/LOAD_ALL';
const CREATE = 'lists/CREATE';
const DELETE = 'lists/DELETE';

const loadAll = allLists => ({
    type: LOAD_ALL,
    allLists
});

const loadNew = newList => ({
    type: CREATE,
    newList
});

const removeList = id => ({
    type: DELETE,
    id
});

export const getAllLists = () => async (dispatch) => {
    const response = await fetch('/api/lists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const allLists = await response.json();
        dispatch(loadAll(allLists));
        return response;
    }
    return response;
}

export const createList = (newList) => async dispatch => {
    const response = await fetch('/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList),
    });

    if (response.ok) {
        const newList = await response.json();
        dispatch(loadNew(newList));
        return response;
    };
    return response;
}

export const deleteList = (id) => async dispatch => {
    const response = await fetch(`/api/lists/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeList(id))
        return response
    };
    return response;
};


let newState;
const initialState = null;
export const listReducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case LOAD_ALL:
            return { ...action.allLists }
        case CREATE:
            return {...state, [action.newList.id]: action.newList }
        case DELETE:
            newState = {...state}
            delete newState[action.id]
            return {...newState}
        default:
            return state;
    }
}
