import { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
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

export default function ProjectThumbnail({title, id, scrollY, imageLink, description, url, lessons}: {title: string, id: string, scrollY: number, imageLink?: string, description: string, url?: string, lessons: string}) {

    return <Tilt 
          options={defaultOptions} 
          className={` p-4 rounded-2xl border-teal-950/0 hover:border-teal-950/20 border-4
                     bg-teal-800/10 hover:bg-teal-800/60`}>
          
          <div className="flex flex-row items-center gap-2" id={id}>
            <img className="w-16 h-10 rounded-md" src={imageLink}></img>
            <h1 className={`
                font-bold font-poppins text-[clamp(1rem,2vw,1.5rem)] transition-all text-yellow-400
            `}>{title}</h1>
          </div>
          <p className="mt-2">
            {description}
          </p>
          <p className="mt-2">
            {lessons}
          </p>

          {url && <div className="flex w-full mt-2 justify-end">
            <button className={`px-4 py-2 text-yellow-200 rounded-md`}><a 
                className="font-poppins font-bold"
                target="_blank"
                href={url}>
                Try it out!
            </a></button>
        </div>}
    </Tilt>
}