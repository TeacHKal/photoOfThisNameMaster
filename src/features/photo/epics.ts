import {AxiosRequestConfig} from "axios";
import ApiService from "../../services/api/ApiService";
import {
    getPhotosFailure,
    getPhotosRequest,
    getPhotosSuccess,
    getPhotosOnLoadMoreSuccess,
    getPhotosOnLoadMoreRequest
} from "./reducer"
import {urlBuild} from "../../services/photoService";

export const fetchPhotos = (tag: string, page: number = 1) => {
    const url = urlBuild(tag, page);
    const config: AxiosRequestConfig = {
        url,
    };

    return (dispatch: any) => {
        dispatch(getPhotosRequest());
        ApiService.request(config)
            .then((response: any) => {
                    dispatch(getPhotosSuccess(response.data))
                }
            )
            .catch((error: any) => {
                dispatch(getPhotosFailure(error));
            })
    };
};

export const fetchPhotosLoadMore = (tag: string, page: number) => {
    const url = urlBuild(tag, page);
    const config: AxiosRequestConfig = {
        url,
    };

    return (dispatch: any) => {
        dispatch(getPhotosOnLoadMoreRequest());
        ApiService.request(config)
            .then((response: any) => {
                    dispatch(getPhotosOnLoadMoreSuccess(response.data))
                }
            )
            .catch((error: any) => {
                dispatch(getPhotosFailure(error));
            })
    };
}

