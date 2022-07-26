import styled from "styled-components";


export const Wrapper1 = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    align-items: center;
`;

export const WrapperTx = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    //align-items: center;
`;

export const Item = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    border: 1px solid #cecece;
    margin: 2px;
    border-radius: 10%;
    div{
        margin: 1px;
        text-align: start;
        width: 205px;
    }

`;

export const Lista = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 12px;
    justify-content: center;

`;

export const WrapperItems = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    div{
        margin: 8px;
        text-align: center;
    }
    width: 80vh;
`;

export const Link = styled.a`
    border: 1px solid black;
    text-align: center;
    :hover{
        background-color: aquamarine;
    }
`;

