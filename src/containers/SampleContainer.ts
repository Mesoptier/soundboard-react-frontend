import { connect } from 'react-redux';

import SampleContainer from '../components/SampleContainer';
import { State } from '../redux';
import { getVisibleSamples } from '../redux/samples/selectors';

const mapStateToProps = (state: State) => ({
    // FIXME: Temporarily render only 100 items
    samples: getVisibleSamples(state).slice(0, 100),
});

export default connect(mapStateToProps)(SampleContainer);
