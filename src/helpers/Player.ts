import { Howl } from 'howler';

import { apiBase, Sample } from '../api';

export default class Player {

    public static play(sample: Sample) {
        this.getHowl(sample).play();
    }

    private static getHowl(sample: Sample): Howl {
        const src = `${apiBase}/samples/${sample.path}`;

        return new Howl({
            src,
        });
    }

}
