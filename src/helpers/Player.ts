import { Howl } from 'howler';

import { apiBase, Sample } from '../api';

export default class Player {
    public static play(sample: Sample): Promise<number> {
        return new Promise((resolve, reject) => {
            const howl = Player.getHowl(sample);
            howl.on('play', soundId => resolve(soundId));
            howl.play();
        });
    }

    public static stopAll() {
        Object.keys(Player.howls)
            .map(sampleId => Player.howls[sampleId])
            .forEach(howl => howl.stop());
    }

    public static on(
        event: string,
        callback: () => void,
        sampleId: number,
        soundId: number,
    ) {
        if (!Player.howls[sampleId]) {
            throw new Error(`Howl not initialized for sample ${sampleId}`);
        }

        Player.howls[sampleId].on(event, callback, soundId);
    }

    public static off(
        event: string,
        callback: () => void,
        sampleId: number,
        soundId: number,
    ) {
        if (!Player.howls[sampleId]) {
            throw new Error(`Howl not initialized for sample ${sampleId}`);
        }

        Player.howls[sampleId].off(event, callback, soundId);
    }

    private static howls: { [sampleId: string]: Howl } = {};

    private static getHowl(sample: Sample): Howl {
        if (!Player.howls[sample.id]) {
            const src = `${apiBase}/samples/${sample.path}`;
            Player.howls[sample.id] = new Howl({
                src,
                html5: true,
            });
        }

        return Player.howls[sample.id];
    }
}
