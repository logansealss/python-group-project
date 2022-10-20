// constants
const LOAD_ALL = 'lists/LOAD_ALL';
const CREATE = 'lists/CREATE';
const UPDATE = 'lists/UPDATE';
const DELETE = 'lists/DELETE';

const loadAll = allLists => ({
    type: LOAD_ALL,
    allLists
});

const loadNew = newList => ({
    type: CREATE,
    newList
});

const updateList = updatedList => ({
    type: UPDATE,
    updatedList
})

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

export const renameList = (updatedList) => async dispatch => {
    const response = await fetch(`/api/lists/${updatedList.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': updatedList.name}),
    });

    if (response.ok) {
        updatedList = await response.json();
        dispatch(updateList(updatedList));
        return response;
    }
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
    switch (action.type) {
        case LOAD_ALL:
            return { ...action.allLists }
        case CREATE:
            return {...state, [action.newList.id]: action.newList }
        case UPDATE:
            return {...state, [action.updatedList.id] : action.updatedList}
        case DELETE:
            newState = {...state}
            delete newState[action.id]
            return {...newState}
        default:
            return state;
    }
}
