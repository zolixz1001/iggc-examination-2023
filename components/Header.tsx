import Image from "next/image";

export default function Header() {
    return (
        <header className="h-[9dvh] bg-blue-500">
            <div className="container  mx-auto flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={32}
                        height={44}
                    />
                    <p className="text-white text-sm  text-center font-thin uppercase hidden md:block min-w-[250px]">
                        <span>Indira Gandhi Government College</span><br />
                        <span>Tezu</span>
                    </p>
                </div>
                <p className="text-white font-bold text-center w-full text-md md:text-right md:text-xl">Examination December, 2023</p>
            </div>
        </header>
    );
}