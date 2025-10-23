import { Button } from "@/components/ui/button"
import coin from "../../../assets/Coinage-Hero-1.png"

export default function Banner() {
    return (
        <div>
            <section className="overflow-x-hidden lg:grid lg:place-content-center bg-[#A8D4CB] bg-[radial-gradient(circle,rgba(168,212,203,1)_0%,rgba(255,255,255,1)_22%,rgba(255,255,255,0.3)_38%,rgba(210,233,228,1)_64%,rgba(168,212,203,1)_80%,rgba(255,255,255,1)_94%)]">
                <div
                    className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
                >
                    <div className="max-w-prose text-left flex flex-col gap-5">
                        <p className="bg-blur-4xl text-center p-2 border rounded-[7px] border-gray-400 text-[#505553] font-semibold">E-Wallet & Payment Gateway</p>
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            Fast, secure, and <strong className="text-[#319B88]"> effortless </strong> payment.
                        </h1>

                        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                            Coinage is designed to simplify and secure online transactions for businesses and individuals.
                        </p>

                        <div className="mt-4 flex gap-4 sm:mt-6">
                            <Button> Get Started</Button>
                            <Button className="bg-[#FF7917]">Learn More</Button>
                        </div>
                    </div>

                    <div className="lg:w-full lg:mt-0 lg:flex p-5 lg:justify-center">
                        <img className="rounded-5xl " src={coin} alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}