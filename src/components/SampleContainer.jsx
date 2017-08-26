// @flow
import * as React from 'react';

import type { Sample } from '../api';

type Props = {
    samples: Sample[],
};

function SampleContainer({ samples }: Props) {
    return (
        <div>
            {samples.map((sample: Sample) => (
                <div key={sample.path}>
                    {sample.name}
                </div>
            ))}
        </div>
    );
}

export default SampleContainer;
