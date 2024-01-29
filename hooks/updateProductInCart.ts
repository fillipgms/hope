import { editItemInCart } from "@/actions/editItemInCart";
import { editCartItem } from "@/redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

export default async function updateProductInCart({
    productId,
    quantity,
    user,
}: {
    productId: string;
    quantity: number;
    user?: models.UserProps;
}) {
    const dispatch = useDispatch();

    dispatch(editCartItem({ id: productId, quantity })),
        await editItemInCart({
            userId: user?.id || "",
            productId,
            quantity,
        });
}
