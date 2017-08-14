import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

// import { getUsers$ } from './users.service';

// Actions
const namespace = 'bitbay/stats/';

const LOAD_CACHED_TICKER_START = `${namespace}LOAD_CACHED_TICKER_START`;
const LOAD_TICKER_START = `${namespace}LOAD_TICKER_START`;
const LOAD_TICKER_SUCCESS = `${namespace}LOAD_TICKER_SUCCESS`;
const LOAD_TICKER_ERROR = `${namespace}LOAD_TICKER_ERROR`;

const LOAD_CACHED_PROFILE_INFO_START = `${namespace}LOAD_CACHED_PROFILE_INFO_START`;
const LOAD_PROFILE_INFO_START = `${namespace}LOAD_PROFILE_INFO_START`;
const LOAD_PROFILE_INFO_SUCCESS = `${namespace}LOAD_PROFILE_INFO_SUCCESS`;
const LOAD_PROFILE_INFO_ERROR = `${namespace}LOAD_PROFILE_INFO_ERROR`;

const UPDATE_COMBINED_INFO_START = `${namespace}UPDATE_COMBINED_INFO_START`;
const UPDATE_COMBINED_INFO_SUCCESS = `${namespace}UPDATE_COMBINED_INFO_SUCCESS`;

// Action creators
const loadCachedTickerStart = () => ({ type: LOAD_CACHED_TICKER_START });
const loadTickerStart = () => ({ type: LOAD_TICKER_START });
const loadTickerSuccess = (ticker) => ({ type: LOAD_TICKER_SUCCESS, payload: ticker });
const loadTickerError = (error) => ({ type: LOAD_TICKER_ERROR, payload: error });

const loadCachedProfileInfoStart = () => ({ type: LOAD_CACHED_PROFILE_INFO_START });
const loadProfileInfoStart = () => ({ type: LOAD_PROFILE_INFO_START });
const loadProfileInfoSuccess = (profileInfo) => ({ type: LOAD_PROFILE_INFO_SUCCESS, payload: profileInfo });
const loadProfileInfoError = (error) => ({ type: LOAD_PROFILE_INFO_ERROR, payload: error });




// Reducers
export const listReducer = (state = [], action = {}) => {
    switch (action.type) {
        case LOAD_USERS_SUCCESS: {
            return action.payload;
        }
        case SELECT_USER: {
            const id = action.payload;
            return state.map((user) => {
                if (user.id === id) {
                    user.selected = !user.selected;
                }
                return user;
            });
        }
        default: {
            return state;
        }
    }
};

export const loadingReducer = (state = false, action = {}) => {
    switch (action.type) {
        case LOAD_USERS_START: {
            return true;
        }
        case LOAD_USERS_SUCCESS:
        case LOAD_USERS_ERROR: {
            return false;
        }
        default: {
            return state;
        }
    }
};

export const errorReducer = (state = null, action = {}) => {
    switch (action.type) {
        case LOAD_USERS_START:
        case LOAD_USERS_SUCCESS: {
            return null;
        }
        case LOAD_USERS_ERROR: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

export const showSelectedReducer = (state = false, action = {}) => {
    switch (action.type) {
        case CONFIRM_SELECTION: {
            return true;
        }
        default: {
            return state;
        }
    }
};

const reducer = combineReducers({
    list: listReducer,
    loading: loadingReducer,
    error: errorReducer,
    showSelected: showSelectedReducer,
});

export default reducer;

// Epics
export const loadUsers$ = action$ =>
    action$.ofType(LOAD_USERS_START)
        .switchMap(() => getUsers$())
            .map((users) => loadUsersSuccess(users))
            .catch((err) => Observable.of(loadUsersError(err)));

export const usersEpics = combineEpics(
    loadUsers$
);
