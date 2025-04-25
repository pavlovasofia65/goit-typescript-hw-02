import css from './ImageCard.module.css'

type Photo = {
    id: number;
    urls: {
        regular: string;
        small: string;
    };
        description?: string;
}


type PhotoProps = {
    photo: Photo;
    onClick: () => void;
};

export default function ImageCard({photo, onClick}: PhotoProps){
    return (
        <div onClick={onClick} className={css.imgageCard}>
            <img src={photo.urls.small} alt={photo.description} />
        </div>
);
}