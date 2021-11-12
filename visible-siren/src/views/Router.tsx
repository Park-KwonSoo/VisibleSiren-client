import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainScreen from './main'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainScreen />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
