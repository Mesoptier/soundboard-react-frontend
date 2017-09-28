import { EventEmitter } from 'eventemitter3';

import { apiBase, Sample } from '../api';

export interface PlayOptions {
    loop?: boolean;
}

export class Player extends EventEmitter {
    private audioContext: AudioContext;
    private gainNode: GainNode;

    private sampleAudios: Map<number, Set<number>> = new Map();
    private audios: Map<number, HTMLAudioElement> = new Map();
    private nextAudioId: number = 0;

    constructor() {
        super();

        this.audioContext = new AudioContext();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 1;
    }

    public setVolume(volume: number): void {
        this.gainNode.gain.value = volume;
    }

    public async play(
        sample: Sample,
        options: PlayOptions = {},
    ): Promise<number> {
        const url = `${apiBase}/samples/${sample.path}`;
        const audio = new Audio(url);
        audio.crossOrigin = 'anonymous';
        const source = this.audioContext.createMediaElementSource(audio);
        source.connect(this.gainNode);

        if (options.loop) {
            audio.loop = true;
        }

        try {
            await audio.play();

            // Register the audio element
            const audioId = this.nextAudioId;
            this.nextAudioId++;

            if (!this.sampleAudios.has(sample.id)) {
                this.sampleAudios.set(sample.id, new Set());
            }
            this.sampleAudios.get(sample.id).add(audioId);
            this.audios.set(audioId, audio);

            audio.addEventListener('ended', () => {
                this.sampleAudios.get(sample.id).delete(audioId);
                this.audios.delete(audioId);

                this.emit(`end.${audioId}`);
            });

            return audioId;
        } catch (error) {
            throw error;
        }
    }

    public stop(sampleId: number): void {
        if (!this.sampleAudios.has(sampleId)) {
            // No audios have been registered for this sample
            return;
        }

        const sampleAudios = this.sampleAudios.get(sampleId);

        sampleAudios.forEach(audioId => {
            this.stopAudio(audioId);
            sampleAudios.delete(audioId);
        });
    }

    public stopAll(): void {
        this.sampleAudios.forEach((_, sampleId) => {
            this.stop(sampleId);
        });
    }

    private stopAudio(audioId: number): void {
        const audio = this.audios.get(audioId);
        audio.pause();
        this.audios.delete(audioId);

        this.emit(`end.${audioId}`);
    }
}

const defaultPlayer = new Player();
export default defaultPlayer;
