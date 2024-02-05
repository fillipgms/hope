import React from "react";

const Footer = () => {
    return (
        <footer className="   ">
            <div className="py-3 px-6 mt-2 border-b-0 rounded-t-md mx-5 border-2 border-hope-primary">
                <p className="text-center">
                    Esse site é apenas para portifólio <br /> Os pedidos aqui
                    feitos não serão enviados
                </p>
            </div>
            <div className=" bg-hope-primary py-3 w-full px-12 flex justify-between items-center">
                Copyright &copy;2023 Fillip Mangia{" "}
                <span>Todos os direitos reservados</span>
            </div>
        </footer>
    );
};

export default Footer;
