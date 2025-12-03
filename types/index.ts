export interface House {
    id?: string;
    title: string;
    price: string;
    description: string;
    fullDescription: string;
    mainImage: string;
    images: string[];
    specifications: {
        bedrooms: string;
        bathrooms: string;
        area: string;
    };
    features?: string[];
    createdAt?: any;
    updatedAt?: any;
}
