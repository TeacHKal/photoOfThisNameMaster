import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureStore from "../store/index"
import {getPhotosSuccess, getPhotosRequest, getPhotosOnLoadMoreSuccess} from "../features/photo/reducer";
import {serverPhotosResponseData} from "./photosTestDataResource";

describe("photosSlice", () => {
    let store;
    let fakeAxios;

    beforeEach(() => {
        store = configureStore;
        fakeAxios = new MockAdapter(axios);
    })

    const photosSlice = () => store.getState().photos;
    const createState = () => ({
        photos: {
            photosData: {},
            list: [],
            isLoading: false,
            isLoadingMore: false,
            error: "",
        }
    })

    it("should add photos to the store after api call", async () => {
        // Arrange
        fakeAxios.onPost('/randomUrl').reply(200, serverPhotosResponseData);

        // Act
        await store.dispatch(getPhotosSuccess(serverPhotosResponseData))
        const storeValue = photosSlice().list;
        const serverValue = serverPhotosResponseData.photos.photo;

        // Assert
        expect(storeValue).toEqual(serverValue);
    })


    describe("loading indicator", () => {

        it("should be true while fetching photos", () => {
            // Arrange
            // Act
            // Assert
            fakeAxios.onGet("/rndSite").reply(() => {
                expect(photosSlice().isLoading).toBe(true);
                return [200, {id: 1}]
            });
        })

        it("should be false after the photos are fetched", async () => {
            // Arrange
            fakeAxios.onGet("/rndSite").reply(200, [{id: 1}]);

            // Act
            await store.dispatch(getPhotosSuccess(serverPhotosResponseData));

            // Assert
            expect(photosSlice().isLoading).toBe(false);
        })

        it("should be false if the server return an error", async () => {
            // Arrange
            fakeAxios.onGet("/rndSite").reply(500);

            // Act
            await store.dispatch(getPhotosSuccess(serverPhotosResponseData));

            // Assert
            expect(photosSlice().isLoading).toBe(false);
        })
    })

    describe("loading indicator on load more photos", () => {

        it("should be true while fetching photos", () => {
            // Arrange
            // Act
            // Assert
            fakeAxios.onGet("/rndSite").reply(() => {
                expect(photosSlice().isLoadingMore).toBe(true);
                return [200, {id: 1}]
            });
        })

        it("should be false after the photos are fetched", async () => {
            // Arrange
            fakeAxios.onGet("/rndSite").reply(200, [{id: 1}]);

            // Act
            await store.dispatch(getPhotosOnLoadMoreSuccess(serverPhotosResponseData));

            // Assert
            expect(photosSlice().isLoadingMore).toBe(false);
        })

        it("should be false if the server return an error", async () => {
            // Arrange
            fakeAxios.onGet("/rndSite").reply(500);

            // Act
            await store.dispatch(getPhotosOnLoadMoreSuccess(serverPhotosResponseData));

            // Assert
            expect(photosSlice().isLoadingMore).toBe(false);
        })
    })

    it("should append new photos to the store after api call", async () => {
        // Arrange
        const state = createState();
        state.photos.list = serverPhotosResponseData.photos.photo;

        fakeAxios.onPost('/randomUrl').reply(200, serverPhotosResponseData);

        // Act
        await store.dispatch(getPhotosSuccess(serverPhotosResponseData))
        await store.dispatch(getPhotosOnLoadMoreSuccess(serverPhotosResponseData))
        const storeValue = photosSlice().list;

        // Assert
        expect(storeValue).toHaveLength(4);
    })

    it("isLoading should be true if getPhotosRequest is called", async () => {
        // Arrange
        // Act
        await store.dispatch(getPhotosRequest());
        // Assert
        expect(photosSlice().isLoading).toBe(true);
    })


})

