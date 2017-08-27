import { connect } from 'react-redux';

import SampleContainer from '../components/SampleContainer';
import { State } from '../redux';

const mapStateToProps = (state: State) => ({
    samples: state.samples.samples,
});

export default connect(mapStateToProps)(SampleContainer);
