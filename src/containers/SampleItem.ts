import { connect, Dispatch } from 'react-redux';

import { Sample } from '../api';
import SampleItem from '../components/SampleItem';
import { State } from '../redux';
import { playSample, stopAllSamples } from '../redux/player/actions';
import { isSamplePlaying } from '../redux/player/selectors';

interface OwnProps {
    sample: Sample;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    isPlaying: isSamplePlaying(state, { sample: ownProps.sample }),
});

const mapDispatchToProps = (dispatch: Dispatch<State>, ownProps: OwnProps) => {
    return {
        playSample() {
            dispatch(stopAllSamples());
            dispatch(playSample(ownProps.sample));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleItem);
