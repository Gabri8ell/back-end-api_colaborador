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
    justify-content: center;
`;

export const Inserir = styled.div`
    display: flex;
    width: 100vh;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #cecece;
`;

export const ImputFields = styled.div`
    display: flex;
    border: 1px solid #cecece;
    padding: 5px;
    margin: 5px;
    flex-direction: row;
    justify-content: space-around;
`;


export const ItemColaboradores = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #cecece;
    padding: 12px;
    border-radius: 10%;
    margin: 2px;
    flex-wrap: wrap;
    div{
        margin: 1px;
        text-align: start;
        width: 170px;
    }
`;

export const Lista = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 12px;
    justify-content: center;
    width: 100vh;
`;