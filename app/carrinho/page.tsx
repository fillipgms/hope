import CartItens from "@/components/CartItens";
import CartItensWizard from "@/components/CartItensWizard";

export default function carrinhoPage() {
    return (
        <main className="max-w-6xl mx-auto mt-10 px-4">
            <div className="py-8 space-y-4">
                <h1 className="text-3xl font-semibold">Seu Carrinho</h1>
            </div>
            <div className="md:grid grid-cols-4 gap-5 flex flex-col-reverse">
                <CartItens />
                <CartItensWizard />
            </div>
        </main>
    );
}
