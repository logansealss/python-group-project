// constants
const LOAD_ALL = 'tags/LOAD_ALL';

const loadAll = allTags => ({
    type: LOAD_ALL,
    allTags
});

export const getAllTags = () => async (dispatch) => {
    const response = await fetch('/api/tags', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const allTags = await response.json();
        console.log('allTags thunk: ', allTags)
        dispatch(loadAll(allTags));
        return allTags;
    }
    return null;
}

const initialState = {};

export const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL:
            return { ...action.allTags }
        default:
            return state;
    }
}