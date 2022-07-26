import { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import * as S from "./styled"

export const NColaborador = () => {
    const colabApi = axios.create({ baseURL: "https://back-end-api-colaborador-cafe.herokuapp.com/colaboradores"});

    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [id, setId] = useState('');

    //mostrar esconder texto id
    const [textoId, setTextoId] = useState(false)

    const mostrarEsconder = (id, nome, cpf) =>{
        if(textoId){
            setTextoId(false)
            setNome("")
            setCpf("")
        }
        else{
            setTextoId(true);
            setId(id);
            setNome(nome)
            setCpf(cpf)
        }        
    }
    
//---------------------------------------------------------
    const [colaboradores, setColaboradores] = useState([{

        id: undefined,
        nome: undefined,
        cpf: undefined,

    }]);

    useEffect(() => {

            axios('https://back-end-api-colaborador-cafe.herokuapp.com/colaboradores')
            .then(({data}) => {
                    setColaboradores(data)
                }
            )
            .catch(error => {
                alert('Erro aconteceu' + error);
            });
        }, [])
    
    function save(){

        const colaborador = {
            id: id,
            cpf : cpf,
            nome : nome
        };
        //Se falso Salva
        if(!textoId){

            axios.post('https://back-end-api-colaborador-cafe.herokuapp.com/colaboradores', colaborador).then((response) => {
                alert(response.data);//imprimir na tela temporariamente
                
            }).catch(function (error)  {
                alert(error.request.responseText);


            }).finally(() => {
                axios('https://back-end-api-colaborador-cafe.herokuapp.com/colaboradores')
                .then(({data}) => {
                    setColaboradores(data)

                }).catch(error => {
                    alert(error.request.responseText);
                });
            });
        //Se verdadeiro Edita
        }else{
            colabApi.put(`${colaborador.id}`, {
                nome: colaborador.nome,
                cpf : colaborador.cpf

            }).then((response) =>{
                alert(response.data);//imprimir na tela temporariamente
                console.log(colaboradores);
                const novoState = colaboradores.filter((i) => i.id !== colaborador.id)
                console.log(colaboradores);
                setColaboradores((state) => [...novoState, {...colaborador}]);
                console.log(colaboradores);

            }).catch(function (error) {
                alert(error.request.responseText);
            });
        }

    }

    const deleteItem = (id) => {
        colabApi.delete(`${id}`).then((response) => {
            alert(response.data);
            console.log(response.data);
            setColaboradores(colaboradores.filter((i) => i.id !== id))
        }).catch(function (error) {
            if(error.request.status === 500){
                alert("Impossível deletar.\nExiste uma ou mais refeições associadas a este colaborador.")
            }else{
                alert(error.request.responseText);
            }
        });
    }

    return(
        <S.Wrapper1>
            <S.WrapperTx>
                {textoId ? (<><h1>Alterar Colaborador com Id: {id}</h1></>) : (<h1>Cadastrar Novo Colaborador</h1> )
                    }
            </S.WrapperTx>   

            <S.Wrapper>
                <S.Inserir>
                    <S.ImputFields>
                        <TextField fullWidth label="CPF" variant="filled" value={cpf} onChange={e => setCpf(e.target.value)}/>
                    </S.ImputFields>

                    <S.ImputFields>
                        <TextField fullWidth label="NOME" variant="filled" value={nome} onChange={e => setNome(e.target.value)}/>
                    </S.ImputFields>
                    
                    <S.ImputFields>
                        <Button variant="contained" onClick={save}>Salvar</Button>
                        <Button variant="oulined" ><a href="/" ><span>Página Inicial</span></a></Button>
                    </S.ImputFields>
                </S.Inserir>
            </S.Wrapper>

            <S.WrapperTx>
                    <h1>Colaboradores Cadastrados</h1>
            </S.WrapperTx>
            <S.Wrapper>
                <S.Lista >
                    {colaboradores.map((colaborador, index) =>{
                        return(
                            //
                            <S.ItemColaboradores key={index}>
                                <div ><b>Id: </b>{colaborador.id}</div>
                                <div><b>Nome: </b>{colaborador.nome}</div>
                                <div><b>CPF: </b>{colaborador.cpf}</div>
                                <button onClick={() => deleteItem(colaborador.id)}>Excluir</button>
                                <button onClick={() => mostrarEsconder(colaborador.id, colaborador.nome, colaborador.cpf)}>Atualizar</button>                    
                            </S.ItemColaboradores>
                                )       
                            }
                        )
                    }
                </S.Lista>
            </S.Wrapper>
        </S.Wrapper1>
    )
}  