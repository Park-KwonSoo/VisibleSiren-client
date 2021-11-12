import React, { useState, useEffect } from 'react';

import MainPresenter from './MainPresenter';
import notifySiren from '../../util/notifySiren';

import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'
import * as speechCommand from '@tensorflow-models/speech-commands';


const URL = 'https://teachablemachine.withgoogle.com/models/mEu7EKG82/';

const MainContainer = () => {

    const [sirenRecog, setSirenRecog] = useState<number>(0);
    const [siren, setSiren] = useState<boolean>(false);


    const initializeSiren = () => {
        setSiren(true);
    };

    const createModel = async() => {
       
        const recognizer = speechCommand.create(
            "BROWSER_FFT",
            undefined,
            URL + 'model.json',
            URL + 'metadata.json'
        );
    
        await recognizer.ensureModelLoaded();

        return recognizer;
    }

    const fetchData = async () => {
        const recognizer = createModel();

        (await recognizer).listen(async (result : speechCommand.SpeechCommandRecognizerResult) => {
            if(result.scores[1] > 0.8) {
                setSirenRecog((sirenRecog : number) => {
                    if(sirenRecog >= 5) {
                        setSiren(true);
                        notifySiren();
                    } else {
                        setSiren(false);
                    }

                    return sirenRecog + 1;
                });
                
            } else {
                setSirenRecog(0);
                setSiren(false);
            }

        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
        });
       
    }


    useEffect(() => {
        initializeSiren();
        fetchData();
    }, []);

    return (
        <MainPresenter
            siren = {siren}
        />
    )
}

export default MainContainer;