export interface Sample {
    id: string;
    path: string;
    name: string;
    mtime: number;
    categories: string[];
}

export const apiBase = 'https://viller.men/soundboard-api';

export async function fetchSamples(): Promise<Sample[]> {
    const response = await fetch(`${apiBase}/samples`);
    const data = await response.json();
    return data.samples;
}
