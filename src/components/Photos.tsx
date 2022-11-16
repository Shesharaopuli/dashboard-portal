import React, { ReactNode, useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card } from 'react-bootstrap';

const PHOTO_URL = "https://jsonplaceholder.typicode.com/photos";

interface IPhotoWeb {
    "id": number,
    "albumId": number,
    "title": string,
    "url": string,
    "thumbnailUrl": string,
}
function Photos() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        axios.get(PHOTO_URL).then((response) => {
            setPhotos(response.data);
        });
    }, []);

    if (photos.length < 1) {
        return <div>No Photos!</div>;
    }
    return (
        <>
            {
                photos.map((photo: IPhotoWeb, index) => {
                    return (
                        <Card style={{ width: '150px', margin: '5px' }} key={index}>
                            <Card.Img variant="top" src={photo.thumbnailUrl} />
                            <Card.Body>
                                <Card.Text>
                                    {photo.title}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </>

    );
}

export default Photos