import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {PhotosData} from "MyModels";

const initialState = {
    photosData: {},
    list: [],
    isLoading: false,
    isLoadingMore: false,
    error: "",
};

const slice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        getPhotosRequest: (state) => {
            state.isLoading = true;
        },
        getPhotosSuccess: (state, action: PayloadAction<PhotosData>) => {
            const {page, perpage, pages, photo, total } = action.payload.photos
            state.list = photo;
            state.photosData = {page, pages, perpage, total}
            state.isLoading = false;
        },
        getPhotosFailure: (state, action) => {
            console.log("teach error", action.payload);
            state.error = action.payload
            state.isLoading = false;
        },
        getPhotosOnLoadMoreRequest: (state) => {
            state.isLoadingMore = true;
        },
        getPhotosOnLoadMoreSuccess: (state, action: PayloadAction<PhotosData>) => {
            const {page, perpage, pages, photo, total } = action.payload.photos
            state.list = state.list.concat(photo);
            state.photosData = {page, pages, perpage, total}
            state.isLoadingMore = false;
        },
    }
})

export const {
    getPhotosRequest,
    getPhotosSuccess,
    getPhotosFailure,
    getPhotosOnLoadMoreRequest,
    getPhotosOnLoadMoreSuccess,
} = slice.actions;

export default slice.reducer;

