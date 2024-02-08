import MoonLoader from "react-spinners/MoonLoader";

export default function Loading() {
    return (
        <div className="w-full space-y-2 flex flex-col items-center justify-center py-5">
            <div className="h-[100px] w-[100px] flex items-center justify-center animate-pulse bg-gray-300 rounded-full dark:bg-gray-700"></div>
            <div className="h-2.5 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        </div>
    );
}
