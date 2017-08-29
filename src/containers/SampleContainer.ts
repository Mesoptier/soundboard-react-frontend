import { connect } from 'react-redux';

import SampleContainer from '../components/SampleContainer';
import { State } from '../redux';
import { getVisibleSamples } from '../redux/samples/selectors';

const mapStateToProps = (state: State) => ({
    samples: getVisibleSamples(state),
});

export default connect(mapStateToProps)(SampleContainer);
