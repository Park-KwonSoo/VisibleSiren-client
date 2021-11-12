import React from 'react';
import * as styled from './MainStyled';
import fireImg from '../../assets/fire.png';
import safeImg from '../../assets/safety.png';

interface MainProps {
    siren : boolean;
}


const MainPresenter = (props : MainProps) => {

    return (
        <styled.Container
            isFire = {props.siren}
        >
            <styled.FireImage 
                src = {props.siren ? fireImg : safeImg}
            />
            <styled.FireAlert isFire = {props.siren}>
            {
                props.siren ?
                '화재가 발생했습니다!' :
                '안전합니다.'
            }
            </styled.FireAlert>
        </styled.Container>
    )
}

export default MainPresenter;
