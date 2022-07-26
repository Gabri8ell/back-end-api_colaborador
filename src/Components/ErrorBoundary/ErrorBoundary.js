import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(erro){
        //Atualiza o state para que a próxima renderização mostre UI alternativa.
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        //Vc tb pode registrar o erro em um serviço de relatório de erro
        //logErrorToMyService(error, errorInfo);

        console.log('Erro: ', error);
        console.log('Mensagem: ', errorInfo);
    }

    render() {
        if(this.state.hasError ){
            //vc pode renderizar qualquer UI alternativa
            return<h1>Algo deu errado.</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;