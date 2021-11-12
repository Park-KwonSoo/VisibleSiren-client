import styled from 'styled-components';
import '../../assets/font.css';


export const Container = styled.div<{isFire : boolean}> `
    height : 100vh;
    width : 100%;
    background-color : ${props => props.isFire ? '#FFA085' : 'transparent'};

    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

export const FireImage = styled.img `
    height : 300px;
    width : 300px;

    border : none;
    resize : cover;
`;

export const FireAlert = styled.div<{isFire : boolean}> `
    margin : 20px;
    font-size : ${props => !props.isFire ? '20px' : '25px'};
    font-family: 'Nanum Myeongjo', serif;
    font-weight : ${props => !props.isFire ? '500' : '600'};
`;