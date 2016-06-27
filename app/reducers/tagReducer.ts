import * as Action from '../actions/tagAction';
import * as Type from '../actions/actionType';

const tag = (state={
    isFetchingTags: false,
    allTags: []
}, action) => {
    switch(action.type) {
        case Type.REQUEST_FETCH_ALL_TAGS:
            return Object.assign({}, state, {
                isFetchingTags: true
            });
        case Type.RECEIVE_FETCH_ALL_TAGS:
            return Object.assign({}, state, {
                isFetchingTags: false,
                allTags: action.tags
            });
        default:
            return state;
    }
};

export default tag;