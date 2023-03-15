import styled from 'styled-components';
export const Container404 = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #112643;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeaderH1 = styled.h1 `
    color: #2EC1D8;
    font-weight: 400;
    font-size: 5rem;
   margin-top: -1em;
`

export const Card = styled.div `
    width: 50em;
    height: 30em;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
        color: #2EC1D8;
        border: 1px solid #2EC1D8;
        border-radius: 4px;
        text-decoration: none;
        text-align: center;
        padding: 10px;
        margin-top: 20px;
        transition: all 0.4s cubic-bezier(0, 0, .58, 1);
        &:hover {
            background-color:#2EC1D8;
            color: #112643;
    } 
    }
`

export const Img = styled.img `
    width: 500px;
    margin-left: -7em;
`

export const ContainerTitles = styled.div `
    display: flex;
    flex-direction: column;
    color: #ffff;
`

export const SubTitle = styled.p `
    margin: 20px 0px;
`