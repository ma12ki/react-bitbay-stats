import { combineEpics } from 'redux-observable';

import { epic as statsEpic } from './stats';

export const rootEpic = combineEpics(
    statsEpic,
);
