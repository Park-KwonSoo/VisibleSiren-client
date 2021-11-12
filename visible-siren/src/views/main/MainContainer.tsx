import React, { useState, useEffect } from 'react'

import MainPresenter from './MainPresenter'

import '@tensorflow/tfjs'
import * as speechCommand from '@tensorflow-models/speech-commands'
import '@tensorflow/tfjs-backend-webgl'
import { SpeechCommandRecognizer } from '@tensorflow-models/speech-commands'
import { async } from 'q'

const URL = 'https://teachablemachine.withgoogle.com/models/mEu7EKG82/'
const _bin = '../../config/aiModel/weights.bin'

const MainContainer = () => {
	const [model, setModel] = useState<SpeechCommandRecognizer>()
	const [action, setAction] = useState<string | undefined>()
	const [labels, setLabels] = useState<string[] | undefined>()
	// (async ()=>{
	//     const model = await tf.loadModel('file://./model-1a/model.json');
	//     model.predict();
	// })()

	const loadModel = async () => {
		// start loading model
		const recognizer = await speechCommand.create(
			'BROWSER_FFT',
			undefined,
			URL + 'model.json',
			URL + 'metadata.json'
		)
		// check if model is loaded
		await recognizer.ensureModelLoaded()

		// store model instance to state
		await setModel(recognizer)

		// store command word list to state
		setLabels(recognizer.wordLabels())
	}

	useEffect(() => {
		loadModel()
	}, [])

	const recognizeCommands = () => {
		console.log('Listening for commands')
		console.log(model)

		function argMax(arr: any) {
			return arr.map((x: any, i: any) => [x, i]).reduce((r: any, a: any) => (a[0] > r[0] ? a : r))[1]
		}

		if (model) {
			model.listen(
				async (result: speechCommand.SpeechCommandRecognizerResult) => {
					if (labels) setAction(labels[argMax(Object.values(result.scores))])
				},
				{ includeSpectrogram: true, probabilityThreshold: 0.95 }
			)
			setTimeout(() => model.stopListening(), 10e3)
		}
	}

	return (
		<>
			<button onClick={recognizeCommands}>Press to Speak</button>
			{action ? <div>{action}</div> : <div>No Action Detected</div>}
			<MainPresenter />
		</>
	)
}

export default MainContainer
