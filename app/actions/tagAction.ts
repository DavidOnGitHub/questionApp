import {get} from '../utils/httpUtils';
import * as Type from './actionType';

const fetchAllTags = () => ((dispatch) => {
    dispatch(requestFetchAllTags());
    return get('tag')
            .then((response) => dispatch(receiveFetchAllTags(response)));
})

const requestFetchAllTags = () => ({
    type: Type.REQUEST_FETCH_ALL_TAGS
});

const receiveFetchAllTags = (response) => ({
    type: Type.RECEIVE_FETCH_ALL_TAGS,
    tags: response.map((tag) => tag.value)
});

export {fetchAllTags};