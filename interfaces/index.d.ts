namespace models {
    interface FotoProps {
        id: string;
        url: string;
        produtoId: string;
    }

    interface ProdutoProps {
        nome: string;
        descricao: string;
        preco: string;
        categoria: string;
        colecao: string;
        fotos: FotoProps[];
    }
}
