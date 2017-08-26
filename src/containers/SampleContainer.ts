import { connect } from 'react-redux';

import SampleContainer from '../components/SampleContainer';
import { State } from '../redux';

function mapStateToProps(state: State) {
    return {
        samples: state.samples.samples,
    };
}

export default connect(mapStateToProps)(SampleContainer);
