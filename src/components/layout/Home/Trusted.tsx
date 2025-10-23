import photo1 from "../../../assets/trust/logo01-coinage.png"
import photo2 from "../../../assets/trust/logo08-coinage.png"
import photo3 from "../../../assets/trust/logo09-coinage.png"
import photo4 from "../../../assets/trust/logo10-coinage.png"
import photo5 from "../../../assets/trust//logo11-coinage.png"
import photo6 from "../../../assets/trust/logo12-coinage.png"


export default function Trusted() {
    return (
        <div className="my-20 px-5 container mx-auto items-center flex flex-col gap-10">
            <p className="w-fit text-[8px] md:text-base bg-blur-4xl text-center p-2 border rounded-[7px] border-gray-400 text-[#505553] font-semibold">Trusted by millions of customers worldwide</p>
            <div className="grid md:grid-cols-6 grid-cols-3 gap-10">
                <img className="border md:rounded-xl rounded-[5px] bg-gray-50" src={photo1} alt="" />
                <img className="border md:rounded-xl rounded-[5px] bg-gray-50" src={photo2} alt="" />
                <img className="border md:rounded-xl rounded-[5px] bg-gray-50" src={photo3} alt="" />
                <img className="border md:rounded-xl rounded-[5px] bg-gray-50" src={photo4} alt="" />
                <img className="border md:rounded-xl rounded-[5px] bg-gray-50" src={photo5} alt="" />
                <img className="border md:rounded-xl rounded-[5px] bg-gray-50" src={photo6} alt="" />
            </div>
        </div>
    )
}