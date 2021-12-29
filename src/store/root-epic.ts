import {combineEpics} from 'redux-observable';
import * as photosEpics from "../features/photo/epics"

export default combineEpics(
    ...Object.values(photosEpics),
);
