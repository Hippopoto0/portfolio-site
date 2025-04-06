import React, { useEffect, useLayoutEffect, useRef, useState, useMemo, useCallback } from "react";
import { Tilt } from 'react-tilt';
import PortfolioData from "./portfolioData.json";
import ProjectThumbnail from "./ProjectThumbnail"; // Ensure this component uses forwardRef
import anime from "animejs";
import { TILT_OPTIONS, SCROLL_OFFSET } from "./constants";

export default function App() {
  const blurRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const [highlightedMenuItems, setHighlightedMenuItems] = useState<string[]>(['about']);

  const menuIds = useMemo(() => {
    const ids = ["about", "projects"];
    PortfolioData.forEach((item) => ids.push(item.id));
    return ids;
  }, []);

  useMemo(() => {
     menuIds.forEach(id => {
         if (!sectionRefs.current[id]) {
            sectionRefs.current[id] = React.createRef<HTMLDivElement>();
         }
     });
  }, [menuIds]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!blurRef.current) return;
    const [x, y] = [e.clientX, e.clientY];
    const elWidth = blurRef.current.offsetWidth;
    const elHeight = blurRef.current.offsetHeight;
    blurRef.current.style.transform = `translate(${x - elWidth / 2}px, ${y - elHeight / 2}px)`;
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const targetRef = sectionRefs.current[id];
    const contentElement = contentRef.current;
    if (targetRef?.current && contentElement) {
      const targetTop = targetRef.current.offsetTop;
      if (blurRef.current) blurRef.current.style.display = 'none';
      contentElement.scrollTo({
        top: targetTop - SCROLL_OFFSET,
        behavior: 'smooth'
      });
      setTimeout(() => {
          if (blurRef.current) blurRef.current.style.display = 'flex';
      }, 800);
    }
  }, [SCROLL_OFFSET]);

  useLayoutEffect(() => {
    anime({
      targets: ".info",
      translateY: [10, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 400 })
    });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const scrollContainer = contentRef.current;
    if (!scrollContainer) return;
    const observerOptions = { root: scrollContainer, rootMargin: "0px", threshold: 0 };
    const observerCallback: IntersectionObserverCallback = (entries) => {
        let maxVisibleIndex = -1;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = menuIds.indexOf(entry.target.id);
                if (index > maxVisibleIndex) maxVisibleIndex = index;
            }
        });
        let currentHighlighted: string[] = [];
        if (maxVisibleIndex !== -1) {
            currentHighlighted = menuIds.slice(0, maxVisibleIndex + 1);
        } else if (scrollContainer.scrollTop < SCROLL_OFFSET + 50) {
            currentHighlighted = ["about"];
        }
        setHighlightedMenuItems(prevItems => {
            const newItemsJson = JSON.stringify(currentHighlighted);
            if (maxVisibleIndex === -1 && scrollContainer.scrollTop >= SCROLL_OFFSET + 50) return prevItems;
            if (JSON.stringify(prevItems) !== newItemsJson) return currentHighlighted;
            return prevItems;
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    menuIds.forEach(id => {
        const ref = sectionRefs.current[id];
        if (ref?.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, [menuIds, SCROLL_OFFSET]);

  return (
    <main className="w-full h-screen bg-teal-900 overflow-hidden">
        {/* Background effects */}
        <div ref={blurRef} className="absolute w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-blue-600 to-green-600 opacity-20 hidden lg:flex pointer-events-none" style={{ willChange: 'transform' }}></div>
        <div className="absolute overflow-hidden w-full h-screen backdrop-blur-3xl pointer-events-none"></div>

        {/* Main scrollable container - Added relative z-10 */}
        <section id="content" ref={contentRef} className="relative z-10 w-full h-screen flex flex-col lg:flex-row overflow-y-auto overflow-x-hidden">

            {/* === Left Pane (Sticky on Large Screens) === */}
            <section className="flex flex-col items-start w-full lg:w-2/5 px-6 sm:px-12 pt-24 md:pt-30 relative lg:sticky lg:h-screen top-0">

                {/* Introduction - Use "Inspect Element" here */}
                <h1 className="w-full text-white font-bold tracking-wider text-[clamp(2.5rem,6vw,3rem)]">
                    Hi there, I'm <span className="font-poppins text-yellow-400 font-bold">Dan</span>.
                </h1>
                <h2 className="text-white mt-4 text-lg md:text-xl">I'm a Software Engineer from the UK.</h2>

                {/* Navigation */}
                <nav className="hidden lg:flex flex-col font-poppins text-gray-300 text-lg p-4 md:p-8 mt-4 space-y-4">
                   <ul className="list-disc cursor-pointer space-y-2">
                        {['about', 'projects'].map(id => (
                        <li key={id}>
                            <button onClick={() => scrollToSection(id)} className={`font-poppins font-bold transition-all text-left ${highlightedMenuItems.includes(id) ? "text-yellow-300 scale-105" : "text-slate-400 hover:text-slate-200"}`}>
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        </li>
                        ))}
                    </ul>
                    <ul className="list-disc ml-4 cursor-pointer tracking-wide space-y-2">
                        {PortfolioData.map((item) =>
                        <li key={item.id}>
                            <button onClick={() => scrollToSection(item.id)} className={`font-poppins font-bold transition-all text-left ${highlightedMenuItems.includes(item.id) ? "text-yellow-300 scale-105" : "text-slate-400 hover:text-slate-200"}`}>
                            {item.title}
                            </button>
                        </li>
                        )}
                    </ul>
                </nav>
                 {/* Footer */}
                <div className="mt-auto pb-8 hidden lg:block">
                    <p className="text-xs text-slate-500">Built with React & Tailwind</p>
                </div>
            </section>
            {/* === End Left Pane === */}

            {/* === Right Pane (Scrollable Content) === */}
            <section className="flex flex-col w-full lg:w-3/5 gap-8 items-start justify-start px-4 md:px-12 lg:px-0 lg:pr-12 text-gray-300">
                 <div className="pt-16 md:pt-24"></div>
                 {/* About Section */}
                <div ref={sectionRefs.current.about} id="about" className="info w-full">
                     <Tilt options={TILT_OPTIONS} className={`p-4 rounded-2xl border-teal-950/0 hover:border-teal-950/20 border-4 bg-teal-800/10 hover:bg-teal-800/60`}>
                        <h3 className="font-bold font-poppins text-3xl text-yellow-400">About Me</h3>
                        <p className="mt-2"> I'm a developer who loves diving into new challenges...</p>
                        <p className="mt-2"> I'm passionate about creating work that isn't just visually impressive...</p>
                    </Tilt>
                </div>
                 {/* Projects Intro Section */}
                <div ref={sectionRefs.current.projects} id="projects" className="info w-full">
                     <Tilt options={TILT_OPTIONS} className={`p-4 rounded-2xl border-teal-950/0 hover:border-teal-950/20 border-4 bg-teal-800/10 hover:bg-teal-800/60`}>
                        <h3 className="font-bold font-poppins text-3xl text-yellow-400">Projects</h3>
                        <p className="mt-2"> Over the years, I've worked on a variety of projects...</p>
                    </Tilt>
                </div>
                 {/* Individual Projects */}
                {PortfolioData.map((portfolioItem) =>
                    <ProjectThumbnail
                        ref={sectionRefs.current[portfolioItem.id]}
                        key={portfolioItem.id}
                        {...portfolioItem}
                    />
                )}
                 <div className="py-44 px-2"></div>
            </section>
            {/* === End Right Pane === */}

        </section>
    </main>
  );
}