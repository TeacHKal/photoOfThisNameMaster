const SECRET = "667de9054d9f05cc";
const PER_PAGE = 10;
const API_KEY = "a5f98a2e0b2a94b75511450414478c75";

const getPhotosData = (tag: string, page: number) => {
    const url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + API_KEY +
        "&tags="+ tag +"&extras=description%2C+date_taken%2C+owner_name&per_page="+ PER_PAGE +
        "&page="+ page +
        "&format=json&nojsoncallback=1";

    return fetch(url)
        .then(response => response.json());
};

export {
    getPhotosData,
};