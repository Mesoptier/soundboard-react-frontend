import glamorous from 'glamorous';
import * as React from 'react';

import Search from '../containers/Search';
import { ThemeProps } from '../theme';

const Container = glamorous.div<ThemeProps>(
    {
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        padding: 15,
        boxSizing: 'border-box',
        display: 'flex',
    },
    ({ theme }) => theme.Header.root,
);

export default function Header() {
    return (
        <Container>
            <Search />
        </Container>
    );
}
