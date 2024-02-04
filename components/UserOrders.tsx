import { getOrdersByUserId } from "@/data/orders";
import React, { useEffect, useState } from "react";

interface UserOrdersProps {
    userId: string;
}

const UserOrders = ({ userId }: UserOrdersProps) => {
    const [orders, setOrders] = useState<models.OrderProps[]>([]);

    useEffect(() => {
        async function fetchOrders() {
            const result = await getOrdersByUserId(userId);
            setOrders(result);
        }
        fetchOrders();
    }, []);

    return (
        <div className="py-2 space-y-3">
            {orders.map((order, i) => (
                <div
                    key={order.id}
                    className="rounded-md overflow-hidden w-full shadow-md text-left"
                >
                    <div className=" bg-hope-primary py-2 items-center px-5 w-full flex justify-between ">
                        <h4>Pedido #{i + 1}</h4>
                        <div className="rounded-lg">{order.status}</div>
                    </div>
                    <div className="px-5 py-4 flex justify-between">
                        <p>
                            {order.OrderItem?.length}{" "}
                            {order.OrderItem?.length !== 1
                                ? "produtos"
                                : "produto"}
                        </p>
                        <p>Total: {order.total}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserOrders;
