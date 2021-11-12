import React, { useState } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

import MainPresenter from './MainPresenter';

interface MainProps extends BrowserRouterProps{}

const MainContainer = (props : MainProps) => {

    return (
        <MainPresenter

        />
    )
}

export default MainContainer;