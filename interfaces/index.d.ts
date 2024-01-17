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
        idCategoria: string;
        idColecao: string;
        fotos: FotoProps[];
    }

    interface Colecaoprops {
        id: string;
        nomeColecao: string;
    }

    interface CategoriaProps {
        id: string;
        nomeCategoria: string;
    }
}
