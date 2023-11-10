export interface CarsProps {
    id: string;
    name: string;
    year: string;
    km: string;
    city: string;
    price: string | number;
    uid: string;
    images: ImagesProps
}

export interface ImagesProps {
    name: string;
    url: string;
    uid: string
}

export interface CarDetailProps {
    id: string;
    name: string;
    model: string;
    year: string;
    km: string;
    city: string;
    price: string | number;
    uid: string;
    description: string
    images: ImagesProps
    created: string;
    owner: string;
    whatsapp: string
}
