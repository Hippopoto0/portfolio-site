import { Tilt } from "react-tilt";
import { TILT_OPTIONS } from "./constants"; // Import shared options
import React from "react"; // Import React for forwardRef

// Define the props type
interface ProjectThumbnailProps {
  title: string;
  id: string; // Keep id for logical reference if needed, but not for direct DOM query
  imageLink?: string;
  description: string;
  url?: string;
  lessons: string;
}

// Use forwardRef to allow passing a ref to the root element
const ProjectThumbnail = React.forwardRef<HTMLDivElement, ProjectThumbnailProps>(
  ({ title, id, imageLink, description, url, lessons }, ref) => {
    return (
      <div ref={ref} id={id} className="info"> {/* Add ref and id here for IntersectionObserver */}
        <Tilt
          options={TILT_OPTIONS} // Use imported options
          className={`p-4 rounded-2xl border-teal-950/0 hover:border-teal-950/20 border-4
                     bg-teal-800/10 hover:bg-teal-800/60`}
        >
          <div className="flex flex-row items-center gap-2">
            {imageLink && <img className="w-16 h-10 rounded-md object-cover" src={imageLink} alt={`${title} thumbnail`} />} {/* Add object-cover and alt text */}
            <h1 className="font-bold font-poppins text-[clamp(1rem,2vw,1.5rem)] transition-all text-yellow-400">
              {title}
            </h1>
          </div>
          <p className="mt-2">{description}</p>
          <p className="mt-2">{lessons}</p>

          {url && (
            <div className="flex w-full mt-2 justify-end">
              <a
                className="px-4 py-2 text-yellow-200 rounded-md font-poppins font-bold hover:text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400" // Added hover/focus styles
                target="_blank"
                rel="noopener noreferrer" // Add rel for security
                href={url}
              >
                Try it out!
              </a>
            </div>
          )}
        </Tilt>
      </div>
    );
  }
);

export default ProjectThumbnail;