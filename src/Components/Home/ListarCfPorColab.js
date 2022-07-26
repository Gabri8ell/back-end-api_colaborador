import React from "react";
import { useEffect, useState } from "react"
import axios from "axios";
import * as S from "./styled";



export const ListarCfPorColab = () => {

    const [colabSelecionado, pegarColab] = useState() 
    const [cafeDaManha, setCafeDaManha] = useState([]);

    const [colaboradores, buscarTdColab] = useState([{

        id: undefined,
        nome: undefined,
        cpf: undefined,

    }]);

    useEffect(() => {

        axios('https://back-end-api-colaborador-cafe.herokuapp.com/colaboradores')
        .then(({data}) => {
                buscarTdColab(data)
            }
        )
        .catch(error => {
            alert('Erro aconteceu' + error);
        });
    }, [])


    function buscarCfManhaPorColab(){
        
        axios.get(`https://back-end-api-colaborador-cafe.herokuapp.com/cafedamanha/buscar_pelo_colaborador/${colabSelecionado}`)
            .then(({data}) => {
                setCafeDaManha(data)
            })
            .catch(error => {
                alert('Ops! Erro a seguir ' + error);
            });
    }

    return(
        <S.Wrapper1>
            <S.WrapperTx>
                <h1>Café da Manhã</h1>
                <h3>Listagem das Reifeições escolhidas pelo nome do Colaborador</h3>
            </S.WrapperTx>
            <S.WrapperItems>
                <select onChange={(event) => pegarColab(event.target.value)}>
                    <option value={0}>Selecione</option>
                    {colaboradores.map((colaborador, index) => (
                        <option key = {index} value= {colaborador.nome}>{colaborador.nome} </option>
                    ))}
                </select>
                
                <button onClick={buscarCfManhaPorColab} type="submit">
                    <span>Buscar</span>
                </button>

                <S.Link href="/novo_colaborador" >
                    Novo Colaborador
                </S.Link>

                <S.Link href="/nova_refeicao">
                    Nova Refeição
                </S.Link>
            </S.WrapperItems>

            <S.WrapperTx>
                <h1>Opções já Cadastradas</h1>
            </S.WrapperTx>

            <S.Wrapper>
                <S.Lista>
                    {cafeDaManha.map((cafeDaManha, index) =>{
                        return (
                            <S.Item key={index}>
                                    <div><b>Id:</b> {cafeDaManha.id_cafe}</div>
                                    <div><b>Refeição:</b> {cafeDaManha.nome}</div>
                                    <div><b>Colaborador:</b> {cafeDaManha.nome_Colaborador}</div>
                            </S.Item>
                        )
                    })}
                </S.Lista>
            </S.Wrapper>
        </S.Wrapper1>
    )
}
