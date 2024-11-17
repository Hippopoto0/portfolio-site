import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Tilt } from 'react-tilt'
import PortfolioData from "./portfolioData.json"
import ProjectThumbnail from "./ProjectThumbnail"
import anime from "animejs"

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            5,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.01,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

export default function App() {
  useLayoutEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    document.getElementById("content")!.addEventListener("scroll", () => {
      setScrollY(document.getElementById("content")!.scrollTop)

      let highlighted = []
      for (let index = 0; index < menuIds.length; index++) {
        const id = menuIds[index];
        
        let el = document.getElementById(id)
        let y = el!.getBoundingClientRect().top + scrollY - 80

        if (scrollY > y) { highlighted.push(id) }
      }

      setHighlightedMenuItems(highlighted)
    }
    );

    anime({
      targets: ".info",
      translateY: [10, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, {start: 400})
    })
  }, [])

  let blurRef = useRef(null);

  let [scrollY, setScrollY] = useState(0)
  let [highlightedMenuItems, setHighlightedMenuItems] = useState<string[]>([])

  let menuIds = ["about", "projects"]

  PortfolioData.forEach((item) => { menuIds.push(item.id) })

  function handleMouseMove(e: MouseEvent) {
    let [x, y] = [e.clientX, e.clientY]

    if (!blurRef.current) return;
    
    let el = blurRef.current as HTMLDivElement;
    el.style.left = `${x - el.clientWidth / 2}px`;
    el.style.top = `${y - el.clientHeight / 2}px`;
  }

  return <main className="w-full h-screen bg-teal-900">
    <div ref={blurRef} className="absolute w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-600 to-green-600 opacity-20 hidden lg:flex"></div>
    <div className="absolute overflow-hidden w-full h-screen backdrop-blur-3xl"></div>

    <section id="content" className="absolute w-full h-screen flex flex-col lg:flex-row overflow-y-auto">
      <section className="flex flex-col items-start w-full lg:w-1/2 px-12 pt-36 relative lg:sticky top-0">
        <h1 className="w-full text-white font-bold tracking-wider text-5xl text-[clamp(2rem,5vw,2.3rem)]">
          Hi there, I'm <span className="font-poppins text-yellow-400 font-bold">Dan</span>.
        </h1>
        <h2 className="text-white mt-4 text-xl">I'm a Software Engineer from the UK.</h2>

        <div className="hidden lg:flex flex-col font-poppins text-gray-300 text-lg p-8 mt-4">
          <ul className="list-disc cursor-pointer">
            <li><div className={`font-poppins font-bold transition-all ${highlightedMenuItems.includes("about") ? "text-yellow-300" : "text-slate-400"}`} onClick={() => {
                    let el = document.getElementById("about")
                    
                    let y = el!.getBoundingClientRect().top + scrollY + 20
                    document.getElementById("content")!.scrollTo({top: y, behavior: 'smooth'})
                  }}>About</div></li>
            <li><div className={`font-poppins font-bold transition-all ${highlightedMenuItems.includes("projects") ? "text-yellow-300" : "text-slate-400"}`} onClick={() => {
                    let el = document.getElementById("projects")
                    
                    let y = el!.getBoundingClientRect().top + scrollY + 20
                    document.getElementById("content")!.scrollTo({top: y, behavior: 'smooth'})
                  }}>
              Projects
            </div></li>
          </ul>
          <ul className="list-disc ml-4 cursor-pointer tracking-wide">
            {PortfolioData.map((item, index) => 
              <li key={index}><div className={`font-poppins font-bold transition-all ${highlightedMenuItems.includes(item.id) ? "text-yellow-300" : "text-slate-400"}`} onClick={() => {
                if (!blurRef.current) return;

                let blurEl = (blurRef.current as HTMLDivElement)
                blurEl.style.display = "none"
                let el = document.getElementById(item.id)
                
                let y = el!.getBoundingClientRect().top + scrollY + 20
                document.getElementById("content")!.scrollTo({top: y, behavior: 'smooth'})
                blurEl.style.display = "flex";
              }}>{item.title}</div></li>
            )}
          </ul>
        </div>

      </section>
      <section className="flex flex-col w-full lg:1/2 gap-8 items-start justify-start pl-2 pr-2 md:pl-12 lg:pl-0 md:pr-12 pt-12 text-gray-300">
        <div className="p-8"></div>
        <Tilt 
          options={defaultOptions} 
          className={`info p-4 rounded-2xl border-teal-950/0 hover:border-teal-950/20 border-4
                     bg-teal-800/10 hover:bg-teal-800/60`}>
          <h1 className="font-bold font-poppins text-3xl text-yellow-400" id="about">About Me</h1>
          <p className="mt-2"> I'm a developer who loves diving into new challenges and expanding my skills beyond the familiar. While I started out crafting seamless, visually appealing user interfaces, I've grown to appreciate working across the stack and embracing new technologies. </p>
          <p className="mt-2"> I'm passionate about creating work that isn't just visually impressive but is also efficient and user-friendly. I approach each project with a focus on detail and commitment to quality. I'm always excited to take on what comes next. </p>
        </Tilt>
        <Tilt 
          options={defaultOptions} 
          className={`info p-4 rounded-2xl border-teal-950/0 hover:border-teal-950/20 border-4
                     bg-teal-800/10 hover:bg-teal-800/60`}>
          <h1 className="font-bold font-poppins text-3xl text-yellow-400" id="projects">Projects</h1>
          <p className="mt-2"> Over the years, I've worked on a variety of projects that have sharpened my ability to learn fast and adapt to new environments. I'm the kind of person who enjoys figuring out how things work and putting that knowledge into practice. Here are some examples!</p>
        </Tilt>
        {PortfolioData.map((portfolioItem, index) => 
          <div className="pl-4 info">
            <ProjectThumbnail id={portfolioItem.id} scrollY={scrollY} title={portfolioItem.title} imageLink={portfolioItem.imageLink} url={portfolioItem.url} description={portfolioItem.description} lessons={portfolioItem.lessons} key={index} />
          </div>
        )}

        <div className="py-44 px-2"></div>

      </section>
    </section>

  </main>
}