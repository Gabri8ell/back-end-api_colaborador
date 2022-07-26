import { useState, useEffect } from "react";
import Button  from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React from "react";
import * as S from "./styled";


export const CadastrarCfManha = () =>{
    const CfManhaApi = axios.create({ baseURL: "https://back-end-api-colaborador-cafe.herokuapp.com/cafedamanha"});

    const [id_Colaborador, setIdColaborador] = useState('');
    const [cafeDaManha, setNomeCafe] = useState('');
    const [id, setId] = useState('');

    //mostrar esconder texto id
    const [textoId, setTextoId] = useState(false)

    const mostrarEsconder = (id, nomeCafe, id_colaborador) =>{
        if(textoId){
            setTextoId(false)
            setNomeCafe("");
            setIdColaborador("");
        }
        else{
            setTextoId(true);
            setId(id);
            setNomeCafe(nomeCafe);
            setIdColaborador(id_colaborador);
        }        
}

//---------------------------------------------------------
    const [cafe_Da_Manha, setCafeDaManha] = useState([{

        id: undefined,
        cafe_Da_Manha: undefined,
        id_colaborador: undefined,
    }]);


    //get All
    useEffect(() => {
        axios('https://back-end-api-colaborador-cafe.herokuapp.com/cafedamanha')
            .then(({data}) => {
                setCafeDaManha(data)
            })
            .catch(error => {
                alert('Ops! Erro a seguir ' + error);
            });
    }, []);
 //--------------------------------------------------------   
    function save(){
            const novaRefeicao = {
                id : id,
                id_Colaborador : id_Colaborador,
                cafeDaManha : cafeDaManha,
            };

            if(!textoId){
                
                axios.post('https://back-end-api-colaborador-cafe.herokuapp.com/cafedamanha', novaRefeicao).then((response) => {
                    alert(response.data);//imprimir na tela temporariamente
                
                }).catch(function (error)  {
                    alert(error.request.responseText);

                }).finally(() => {
                    axios('https://back-end-api-colaborador-cafe.herokuapp.com/cafedamanha')
                    .then(({data}) => {
                        setCafeDaManha(data)

                    }).catch(error => {
                        alert(error.request.responseText);
                    });
                });

            }else{
                CfManhaApi.put(`${novaRefeicao.id}`, {
                    cafeDaManha: novaRefeicao.cafeDaManha,
                    id_Colaborador : novaRefeicao.id_Colaborador

                }).then((response) =>{
                    alert(response.data);//imprimir na tela temporariamente
                    console.log(cafe_Da_Manha);
                    const novoState = cafe_Da_Manha.filter((i) => i.id !== novaRefeicao.id)
                    console.log(cafe_Da_Manha);
                    setCafeDaManha((state) => [...novoState, {...novaRefeicao}]);
                    console.log(cafe_Da_Manha);
                    

                }).catch(function (error) {
                    alert(error.request.responseText)
                });
            }
    
        }

    
    const deleteItem = (id) => {
        CfManhaApi.delete(`${id}`).then((response) => {
            alert(response.data);
            setCafeDaManha(cafe_Da_Manha.filter((i) => i.id !== id))
        })
    }

    /*const deleteItem = (index) => () =>
        setCafeDaManha((cafe_Da_Manha) => cafe_Da_Manha.filter((_, i) => i !== index));*/
    

    return(
        <S.Wrapper1>
            <S.WrapperTx>
                {textoId ? (<><h1>Alterar Refeições do Colaborador com id {id}</h1></>) : (<h1>Cadastrar Nova Refeição</h1> )
                    }
            </S.WrapperTx>

            <S.Inserir>
                <S.ImputFields>
                    <TextField type="number" fullWidth label="ID DO COLABORADOR" variant="filled" value={id_Colaborador} onChange={e => setIdColaborador(e.target.value)}/>
                </S.ImputFields>

                <S.ImputFields>
                    <TextField fullWidth label="REFEIÇÃO" variant="filled" value={cafeDaManha} onChange={e => setNomeCafe(e.target.value)}/>
                </S.ImputFields>
                
                <S.ImputFields>
                    <Button variant="contained" onClick={save}>Salvar</Button>
                    <Button variant="oulined" ><a href="/" ><span>Página Inicial</span></a></Button>
                </S.ImputFields>
            </S.Inserir>

            <S.WrapperTx>
                <h1>Refeições já Cadastradas</h1>    
            </S.WrapperTx> 
                
            <S.Wrapper>     
                <S.Lista>
                    {cafe_Da_Manha.map((cafe_Da_Manha, index) =>{
                        return (
                        <S.Item key={index}>
                            <div><b>Id: </b> {cafe_Da_Manha.id}</div>
                            <div><b>Refeição: </b> {cafe_Da_Manha.cafeDaManha}</div>
                            <div><b>Id colaborador: </b> {cafe_Da_Manha.id_colaborador}</div>
                            <button onClick={() => deleteItem(cafe_Da_Manha.id)}>Excluir</button>
                            <button onClick={() => mostrarEsconder(cafe_Da_Manha.id, cafe_Da_Manha.cafeDaManha, cafe_Da_Manha.id_colaborador)}>Atualizar</button>
                        </S.Item>
                        )
                    })}
                </S.Lista>
            </S.Wrapper>
        </S.Wrapper1>
    );

}
