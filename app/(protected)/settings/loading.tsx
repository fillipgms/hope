import MoonLoader from "react-spinners/MoonLoader";

export default function Loading() {
    return (
        <div className="w-full space-y-2 flex flex-col items-center justify-center py-5">
            <div
                role="status"
                className=" flex-1 bg-cover bg-no-repeat bg-center  md:flex-1 relative md:block flex flex-col md:justify-center md:items-center h-full"
            >
                <div className="md:absolute md:w-[28rem] rounded-full overflow-hidden md:h-[28rem] aspect-square w-full md:p-1 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:block shadow-lg">
                    <div className="flex relative items-center justify-center h-full w-full bg-gray-300 rounded  dark:bg-gray-700">
                        <MoonLoader color="#000" />
                    </div>
                </div>

                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            </div>
        </div>
    );
}
