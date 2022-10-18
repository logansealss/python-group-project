import CreateListTagForm from "../components/Forms/CreateTagListForm";

// constants
const LOAD_ALL = 'lists/LOAD_ALL';

const loadAll = allLists => ({
    type: LOAD_ALL,
    allLists
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
        return allLists;
    }
    return response;
}

export const createList = () => async dispatch => {
    const response = await fetch('/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const allLists = await response.json();
        dispatch(loadAll(allLists));
        return allLists;
    };
    return response;
}

const initialState = {};

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            return { ...action.allLists }

        default:
            return state;
    }
}
