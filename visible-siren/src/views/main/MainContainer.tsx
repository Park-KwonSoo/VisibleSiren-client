import React, { useState, useEffect } from 'react';

import MainPresenter from './MainPresenter';

import * as tf from '@tensorflow/tfjs';
import * as speechCommand from '@tensorflow-models/speech-commands';


const URL = 'https://teachablemachine.withgoogle.com/models/mEu7EKG82/';
const _bin = '../../config/aiModel/weights.bin';

const MainContainer = () => {

    const [siren, useSiren] = useState<string>('');


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
        const classLabels = (await recognizer).wordLabels();

        // for (let i = 0; i < classLabels.length; i++) {
        //     console.log(classLabels[i]);
        // }
       
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainPresenter

        />
    )
}

export default MainContainer;