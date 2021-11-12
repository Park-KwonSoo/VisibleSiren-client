import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" />
				<Redirect path="*" to="/" />
			</Switch>
		</BrowserRouter>
	)
}

export default Router
