import React, { useState, useEffect } from 'react'

import MainPresenter from './MainPresenter'

import '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import * as speechCommand from '@tensorflow-models/speech-commands'

import fireImg from '../../assets/fire.png'

const URL = 'https://teachablemachine.withgoogle.com/models/mEu7EKG82/'

const MainContainer = () => {
	const [sirenRecog, setSirenRecog] = useState<number>(0)
	const [siren, setSiren] = useState<boolean>(false)

	const initializeSiren = () => {
		setSiren(true)
	}
	const createModel = async () => {
		const recognizer = speechCommand.create('BROWSER_FFT', undefined, URL + 'model.json', URL + 'metadata.json')

		await recognizer.ensureModelLoaded()

		return recognizer
	}

	const useNotification = (title: string, options: any) => {
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

	const triggerNotif = useNotification('화재 알림', {
		body: '불이 났습니다. 대피하세요!!!',
		icon: fireImg,
	})

	const fetchData = async () => {
		const recognizer = createModel()

		;(await recognizer).listen(
			async (result: speechCommand.SpeechCommandRecognizerResult) => {
				if (result.scores[1] > 0.8) {
					setSirenRecog((sirenRecog: number) => {
						console.log(sirenRecog)
						if (sirenRecog >= 5) {
							setSiren(true)
							triggerNotif()
						} else {
							setSiren(false)
						}

						return sirenRecog + 1
					})
				} else {
					setSirenRecog(0)
					setSiren(false)
				}
			},
			{
				includeSpectrogram: true, // in case listen should return result.spectrogram
				probabilityThreshold: 0.75,
				invokeCallbackOnNoiseAndUnknown: true,
				overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
			}
		)
	}

	useEffect(() => {
		initializeSiren()
		fetchData()
	}, [])

	return <MainPresenter siren={siren} />
}

export default MainContainer
