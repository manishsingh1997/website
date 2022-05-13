import { Photo } from './GalleryContent';

export const fillCaptionsInPhotos = (photos: Photo[]):Photo[] => {
    return photos.map((photo) => {
        if (!photo.caption && photo.title) {
            return {
            ...photo,
            caption: photo.title,
            };
        }
        return photo;
    });
}

