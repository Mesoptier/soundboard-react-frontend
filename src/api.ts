export interface Sample {
    id: number;
    urlId: string;
    path: string;
    name: string;
    mtime: number;
    categories: string[];
}

export const apiBase = 'https://viller.men/soundboard-api';

export async function fetchSamples(): Promise<Sample[]> {
    const response = await fetch(`${apiBase}/samples`);
    const data = await response.json();
    data.samples.forEach((sample: any, index: number) => {
        sample.urlId = sample.id;
        sample.id = index;
    });
    return data.samples;
}
