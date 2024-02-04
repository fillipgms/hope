namespace models {
    interface FotoProps {
        id: string;
        url: string;
        produtoId?: string;
    }
    interface ProdutoProps {
        id: string;
        name: string;
        description: string;
        price: int;
        categoryId: string;
        collectionId: string;
        pictures: FotoProps[];
        collection: {
            id: string;
            collectionName: string;
        };
        category: {
            id: string;
            categoryName: string;
        };
        cartItem?: CartItemProps[];
    }

    interface ColecaoProps {
        id: string;
        collectionName: string;
        produtos?: ProdutoProps[];
    }

    interface CategoriaProps {
        id: string;
        categoryName: string;
        produtos?: ProdutoProps[];
    }

    interface CartItemProps {
        id: string;
        productId: string;
        quantity: number;
        cartId: string;
        product: ProdutoProps;
    }

    interface CartProps {
        id: string;
        items: CartItemProps[];
        user: UserProps;
        userId: string;
    }

    interface UserProps {
        id: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        emailVerified?: Date | null;
        password?: string | null;
        image?: string | null | undefined;
        role: UserRole;
        accounts?: AccountProps[];
        cart?: CartProps | null;
        orders?: OrderProps[];
    }

    interface OrderItemProps {
        id: string;
        product: ProdutoProps;
        productId: string;
        quantity: number;
        orderId: string;
    }

    interface OrderProps {
        id: string;
        OrderItem: OrderItemProps[];
        user?: UserProps;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        total: number;
    }

    interface AccountProps {
        id: string;
        userId: string;
        type: string;
        provider: string;
        providerAccountId: string;
        refresh_token: string | null;
        access_token: string | null;
        expires_at: number | null;
        token_type: string | null;
        scope: string | null;
        id_token: string | null;
        session_state: string | null;
        user: UserProps;
    }

    interface VerificationTokenProps {
        id: string;
        email: string;
        token: string;
        expires: Date;
    }

    interface PasswordResetTokenProps {
        id: string;
        email: string;
        token: string;
        expires: Date;
    }
}
