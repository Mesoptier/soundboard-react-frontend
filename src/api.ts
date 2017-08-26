export interface Sample {
    id: string;
    path: string;
    name: string;
    mtime: number;
    categories: string[];
}

export async function fetchSamples(): Promise<Sample[]> {
    const response = await fetch('https://viller.men/soundboard-api/samples');
    const data = await response.json();
    return data.samples;
}
