import React from 'react';
import * as styled from './MainStyled';


interface MainProps {
    siren : boolean;
}

const MainPresenter = (props : MainProps) => {

    return (
        <styled.Container>
            {
                props.siren ?
                '불낳ㅆ따!' : 'Normal'
            }
        </styled.Container>
    )
}

export default MainPresenter;
