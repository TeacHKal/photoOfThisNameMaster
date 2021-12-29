declare module 'MyModels' {
    export type Photo = {
        id: string,
        owner: string,
        secret: string,
        server: string,
        farm: number
        title: string,
        ispublic: number,
        isfriend: number,
        isfamily: number,
        description: description,
        datetaken: string,
        datetakengranularity: number,
        datetakenunknown: number,
        ownername: string
    }

    type description = {
        _content: string,
    }

    export type PhotosData = {
        photos: Photos
    };

    export type Photos = {
        page: number,
        pages: string,
        perpage: number,
        total: string,
        photo: Array<photo>
    }

}