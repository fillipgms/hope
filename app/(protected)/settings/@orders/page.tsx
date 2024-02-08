import { auth } from "@/auth";
import { getOrdersByUserId } from "@/data/orders";
import Image from "next/image";

export default async function OrdersPage() {
    const session = await auth();

    if (!session || !session.user) return;

    const orders = await getOrdersByUserId(session.user.id);

    const meses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
    ];

    if (!orders || orders.length === 0) {
        return (
            <div className="py-5 flex items-center justify-center">
                <p>Você ainda não fez nenhum pedido</p>
            </div>
        );
    }

    return (
        <div className=" text-center">
            <h3 className="font-semibold py-1 rounded-md">Meus pedidos</h3>
            <div className="py-2 space-y-3 px-5">
                {orders.map((order) => {
                    return (
                        <div
                            key={order.id}
                            className="border rounded-md overflow-hidden"
                        >
                            <div className="bg-hope-primary py-2 px-4 text-sm flex gap-3 justify-between">
                                <span className="text-left">
                                    <h4 className="uppercase">
                                        Pedido realizado
                                    </h4>
                                    <p className="text-xs">
                                        {order.createdAt.getDate()} de{" "}
                                        {meses[order.createdAt.getMonth()]} de{" "}
                                        {order.createdAt.getFullYear()}
                                    </p>
                                </span>
                                <span className="text-right">
                                    <h4 className="uppercase">total</h4>
                                    <p className="text-xs">{order.total}</p>
                                </span>
                            </div>
                            <div className="py-3 space-y-3 px-4">
                                {order.OrderItem.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex rounded-md overflow-hidden w-full"
                                    >
                                        <div className=" w-28">
                                            <Image
                                                src={
                                                    item.product.pictures[0].url
                                                }
                                                alt={item.product.name}
                                                width={500}
                                                height={500}
                                                loading="lazy"
                                                className="h-full aspect-square object-cover "
                                            />
                                        </div>
                                        <div className="text-left gap-3 pl-3 w-full space-y-2 flex justify-between items-center">
                                            <span>
                                                <h5>{item.product.name}</h5>
                                            </span>
                                            <span className="text-right">
                                                <h5 className="font-semibold">
                                                    R$ {item.product.price}
                                                </h5>
                                                <p>
                                                    quantidade: {item.quantity}
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
