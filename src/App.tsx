import { useLayoutEffect, useState } from 'react'
import anime from "animejs/lib/anime.es"
import "./index.css"
import PortfolioThumbnail from './PortfolioThumbnail'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import PortfolioData from "./portfolioData.json"
import { AnimatePresence, motion } from 'framer-motion'
import { div } from 'framer-motion/client'

function App() {
  useLayoutEffect(() => {
      anime.timeline({
        targets: ".message-box",
      }).add({
        scale: [0, 1],
        translateX: ["-400%", "-100%"],
        translateY: ["100%", "0%"],
        easing: 'spring(1, 80, 10, 0)',
      }, 0).add({
        targets: ".message-text",
        opacity: [0, 1]
      }, 800).add({
        width: ["4rem", "16rem"],
        translateX: "0%",
        easing: 'spring(1, 80, 10, 0)',
      }, 800).add({
        targets: '.grid-item',
        scale: [
          // {value: .1, easing: 'easeOutSine', duration: 500},
          {value: 0, duration: 0},
          {value: 1, easing: 'linear', duration: 800}
        ],
        delay: anime.stagger(150, {grid: [60, 30], from: 'center'})
      }, 2000).add({
        targets: ".background-blur",
        opacity: [1, 0],
        duration: 10000
      }, 3000).add({
        targets: ".projects-title",
        opacity: [0, 1],
        translateY: [-10, 0],
        easing: "easeOutCubic"
      }, 4000).add({
        targets: ".portfolio-thumb",
        opacity: [0, 1],
        translateY: [-10, 0],
        easing: "easeOutCubic",
        delay: anime.stagger(150)
      }, 5000).add({
        targets: ".grid-item .message-text",
        opacity: 0,
        duration: 0
      })

  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0)

  return <main className='absolute flex w-full h-screen bg-zinc-800 items-center justify-center overflow-hidden'>

        <div className='background-blur absolute bg-gradient-to-br from-blue-500/30 to-green-600/30 w-80 h-80 rounded-full'></div>
        <div className='absolute w-full h-full backdrop-blur-3xl'></div>
        <div className='absolute'>
          <div className='relative message-box bg-blue-500 w-16 h-8 rounded-2xl shadow-lg -translate-x-[-400%] flex items-center'>
            <h1 className='message-text text-md font-bold text-white opacity-0 whitespace-nowrap mx-4'>
              Hi there, I'm Dan 😁
            </h1>
          </div>
        </div>
        <div className='absolute flex flex-col'>
          {Array(30).fill(0).map(() => 
            <div className='flex flex-row'>
              {Array(60).fill(0).map(() =>
                <div className='grid-item scale-0 w-4 h-4 bg-zinc-800' style={{
                  maskImage: 'linear-gradient(to right, transparent 100%)',
                }}></div>
              )}
            </div>
          )}
        </div>

        <section className='w-full h-screen flex flex-col p-8 overflow-auto z-10'>
          <header className='w-full h-28 flex items-end'>
            <h1 className='opacity-0 projects-title font-bold text-gray-200 text-3xl'>Some Projects</h1>
          </header>
          <div className='w-full flex-1 p-8 flex flex-row flex-wrap gap-8'>
            <PortfolioThumbnail onClick={() => { setIsOpen(true); setIndex(0)}} index={0} />
            <PortfolioThumbnail onClick={() => { setIsOpen(true); setIndex(1) }} index={1} />
            <PortfolioThumbnail onClick={() => { setIsOpen(true); setIndex(2) }} index={2} />
          </div>
        </section>

        <AnimatePresence>
          {isOpen &&
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                exit={{ opacity: 0 }}
                className='absolute z-20 w-full h-full bg-white/20' onClick={() => setIsOpen(false)}></motion.div>
              <div className='absolute z-20 w-full h-full flex items-center justify-center pointer-events-none'>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0}}
                  animate={{ scale: 1, opacity: 1}}
                  exit={{ scale: 0.8, opacity: 0}}
                  transition={{ ease: "easeOut"}}
                  className='pointer-events-auto relative w-[40rem] max-w-[80%] h-[30rem] rounded-2xl bg-zinc-800 shadow-lg'>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className='cursor-pointer absolute top-4 right-4 w-10 h-10 scale-[100%] flex items-center justify-center' style={{ textShadow: "0px 0px 2px white"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                      </svg>
                    </button>

                  <div className=' h-32 rounded-2xl' style={{ backgroundImage: `url('${PortfolioData[index].imageLink}')`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                  <div className='w-full h-16 bg-gradient-to-b from-transparent to-zinc-800 -translate-y-16'></div>
                  <div className=' -translate-y-12 p-8'> 
                    <h1 className='font-bold text-xl text-zinc-200'>{PortfolioData[index].title}</h1>
                    <p className=' text-zinc-200 mt-2 font-bold'>{PortfolioData[index].description}</p>
                    <p className='text-zinc-200 mt-2'>{PortfolioData[index].lessons}</p>
                    {PortfolioData[index].url !== undefined &&
                      <button
                        className=' bg-zinc-200 font-bold text-zinc-800 px-2 py-3 mt-8 rounded-lg'
                      ><a href={PortfolioData[index].url} target='_blank'>Open in New Tab</a></button>
                    }
                  </div>
                </motion.div>
              </div>
            </>
          }
        </AnimatePresence>

  </main>
}

export default App;