
'use strict';

import { LOADING_START,LOADING_DONE } from "../actions/ActionType";

export default function doReducer(state = {}, action) {

    switch (action.type) {

        case LOADING_START:

            return Object.assign({}, state, {
                requestIsSuccess: action.requestIsSuccess,
                status: LOADING_START,
                actionType: action.actionType,
                result: null
            });

        case LOADING_DONE:

            return Object.assign({}, state, {
                requestIsSuccess: action.requestIsSuccess,
                status: LOADING_DONE,
                actionType: action.actionType,
                result: action.result
            });

        default:
            return state;
    }
}
