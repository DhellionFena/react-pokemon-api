import styled from 'styled-components'

export const Row = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
`

export const Box = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: ${props => props.align ? props.align : "flex-start"};
    justify-content: flex-start;
    padding-left: 25px;
    min-width: ${props => props.width}px;
    border: 2px solid gray;
`

export const Banner = styled.div`
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15vh;
    border: 2px solid black;
    background-color: rgba(245,43,28,0.85);
    color: white
`