import {Photo} from "MyModels";

const SECRET = "667de9054d9f05cc";
const PER_PAGE = 10;
const API_KEY = "a5f98a2e0b2a94b75511450414478c75";

export const getImageUrlThumb = (photo: Photo, size = "m") => {
    return "https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + size + ".jpg";
}

export const urlBuild = (tag: string, page: number) => {
    return "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + API_KEY +
        "&tags=" + tag + "&extras=description%2C+date_taken%2C+owner_name&per_page=" + PER_PAGE +
        "&page=" + page +
        "&format=json&nojsoncallback=1";
}

export const SIZE = {
    SMALL_240px: "m",
    MEDIUM_800px: "c",

}