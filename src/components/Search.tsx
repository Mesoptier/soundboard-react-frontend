import glamorous from 'glamorous';
import * as React from 'react';

const Input = glamorous.input(
    {
        flex: '1 0 auto',
        padding: '10px 20px',
        height: '100%',
        boxSizing: 'border-box',

        borderRadius: 3,
        border: 0,
        outline: 0,
        font: 'inherit',
    },
    ({ theme }) => theme.Search.input,
);

export interface SearchProps {
    query: string;
    onChange: React.FormEventHandler<HTMLInputElement>;
}

export default function Search({ query, onChange }: SearchProps) {
    return (
        <Input
            type="text"
            value={query}
            onChange={onChange}
            placeholder="Cook, Search, Delicious!"
        />
    );
}
