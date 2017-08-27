import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import Search from '../components/Search';
import { State } from '../redux';
import { setQuery } from '../redux/samples/actions';

const mapStateToProps = (state: State) => ({
    query: state.samples.query,
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(setQuery(e.currentTarget.value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
