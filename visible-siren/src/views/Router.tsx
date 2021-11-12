import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Navigate to="/" />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
