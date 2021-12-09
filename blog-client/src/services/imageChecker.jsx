import {GetPhotos} from "../api/apiKeys"

export function CheckPath(photoPath) {
    return (photoPath != null ? GetPhotos + `/${photoPath}` : null);
}