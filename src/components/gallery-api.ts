import axios from 'axios'

const key = 'pwrvRKN0wakqlu-l3I8PUgYcHAPBjzENYgyQdtIGexs';

axios.defaults.baseURL = `https://api.unsplash.com`;

type Photo = {
    id: number;
    urls: {
        small: string;
    };
    description: string;
};

type Response = {
    results: Photo[];
    total: number;
    total_pages: number;
};

async function fetchPhotos(search: string, page?: number): Promise<Photo[]>{
    try {
        const response = await axios.get<Response>('search/photos', {
            params:
            {
                query: search,
                per_page: 15,
                orientation: 'landscape',
                client_id: key,
                page: page,
                }
        });
        return response.data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
    
}

export default fetchPhotos;