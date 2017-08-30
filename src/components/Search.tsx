import * as React from 'react';

export interface SearchProps {
    query: string;
    onChange: React.FormEventHandler<HTMLInputElement>;
}

export default function Search({ query, onChange }: SearchProps) {
    return <input type="text" value={query} onChange={onChange} />;
}
