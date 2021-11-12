import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import MainPresenter from './MainPresenter'

import '@tensorflow/tfjs'
import * as speechCommand from '@tensorflow-models/speech-commands'
import '@tensorflow/tfjs-backend-webgl'
import { SpeechCommandRecognizer } from '@tensorflow-models/speech-commands'

const URL = 'https://teachablemachine.withgoogle.com/models/mEu7EKG82/'

const MainContainer = () => {
	const useNotification = (title: string, options: any) => {
		console.log(Notification.permission)

		// if (!('Notification' in window)) {
		// 	return
		// }
		const fireNotif = () => {
			/* 권한 요청 부분 */
			if (Notification.permission === 'denied') {
				Notification.requestPermission().then((permission) => {
					if (permission === 'granted') {
						/* 권한을 요청받고 nofi를 생성해주는 부분 */
						new Notification(title, options)
					} else {
						return
					}
				})
			} else {
				/* 권한이 있을때 바로 noti 생성해주는 부분 */
				new Notification(title, options)
			}
		}
		return fireNotif
	}

	const [model, setModel] = useState<SpeechCommandRecognizer>()
	const [action, setAction] = useState<string | undefined>()
	const [labels, setLabels] = useState<string[] | undefined>()

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

	const triggerNotif = useNotification('Test Noti', {
		body: 'notification body test',
	})

	return (
		<>
			<button onClick={recognizeCommands}>Press to Speak</button>
			{action ? <div>{action}</div> : <div>No Action Detected</div>}
			<button onClick={triggerNotif}> Push notification </button>
			<MainPresenter />
		</>
	)
}

export default MainContainer
