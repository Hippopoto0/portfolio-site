import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import PortfolioData from "./portfolioData.json"
import { useState } from "react"
// import cardsImage from "./assets/cards-against-sapiens.webp"

export default function PortfolioThumbnail({ index, onClick }: { index: number, onClick: any }) {
    const [isOpen, setIsOpen] = useState(true)

    return <>
        <div onClick={onClick} className='opacity-0 portfolio-thumb w-52 h-52 border-2 border-slate-300/30 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition shadow-sm shadow-green-600 hover:shadow-indigo-500/30 hover:shadow-lg'>
            <img src={PortfolioData[index].imageLink} alt="" />
            <div className="p-2">
                <h1 className="text-slate-200 font-bold mb-2">{PortfolioData[index].title}</h1>
                <p className="text-xs text-slate-200/40">{PortfolioData[index].description}</p>
            </div>
        </div>

    </>
}