import React from "react";
import {
      FaReact,
      FaLinux,
      FaJava,




} from "react-icons/fa";

import {
      SiExpress,
      SiMongodb,
      SiDjango,
      SiTypescript,
      SiMysql,


} from "react-icons/si";

import {
      RiNextjsLine,
      RiNodejsFill,
      RiTailwindCssFill,


} from "react-icons/ri";


import { useAnimate } from "framer-motion";

export const Stacks = () => {
      return (
            <div className="bg-neutral-50 px-4 py-12">
                  <div className="mx-auto max-w-7xl text-center">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Tech Stack</h2>
                        <p className="text-neutral-600 mb-10">Tools and technologies I work with</p>
                        <ClipPathLinks />
                  </div>
            </div>
      );
};

const ClipPathLinks = () => {
      return (
            <div className="divide-y divide-neutral-900 border border-neutral-900">

                  <div className="grid grid-cols-4 divide-x divide-neutral-900">
                        <LinkBox Icon={FaReact} />
                        <LinkBox Icon={FaLinux} />
                        <LinkBox Icon={FaJava} />
                        <LinkBox Icon={SiMysql} />
                  </div>
                  <div className="grid grid-cols-4 divide-x divide-neutral-900">
                        <LinkBox Icon={SiExpress} />
                        <LinkBox Icon={SiMongodb} />
                        <LinkBox Icon={SiDjango} />
                        <LinkBox Icon={SiTypescript} />
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-neutral-900">
                        <LinkBox Icon={RiNextjsLine} />
                        <LinkBox Icon={RiNodejsFill} />
                        <LinkBox Icon={RiTailwindCssFill} />
                  </div>
            </div>
      );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
      left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
      bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
      top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
      right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
      left: [NO_CLIP, TOP_RIGHT_CLIP],
      bottom: [NO_CLIP, TOP_RIGHT_CLIP],
      top: [NO_CLIP, TOP_RIGHT_CLIP],
      right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href }) => {
      const [scope, animate] = useAnimate();

      const getNearestSide = (e) => {
            const box = e.target.getBoundingClientRect();

            const proximityToLeft = {
                  proximity: Math.abs(box.left - e.clientX),
                  side: "left",
            };
            const proximityToRight = {
                  proximity: Math.abs(box.right - e.clientX),
                  side: "right",
            };
            const proximityToTop = {
                  proximity: Math.abs(box.top - e.clientY),
                  side: "top",
            };
            const proximityToBottom = {
                  proximity: Math.abs(box.bottom - e.clientY),
                  side: "bottom",
            };

            const sortedProximity = [
                  proximityToLeft,
                  proximityToRight,
                  proximityToTop,
                  proximityToBottom,
            ].sort((a, b) => a.proximity - b.proximity);

            return sortedProximity[0].side;
      };

      const handleMouseEnter = (e) => {
            const side = getNearestSide(e);

            animate(scope.current, {
                  clipPath: ENTRANCE_KEYFRAMES[side],
            });
      };

      const handleMouseLeave = (e) => {
            const side = getNearestSide(e);

            animate(scope.current, {
                  clipPath: EXIT_KEYFRAMES[side],
            });
      };

      return (
            <a
                  href={href}
                  onMouseEnter={(e) => {
                        handleMouseEnter(e);
                  }}
                  onMouseLeave={(e) => {
                        handleMouseLeave(e);
                  }}
                  className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
            >
                  <Icon className="text-xl sm:text-3xl lg:text-4xl" />

                  <div
                        ref={scope}
                        style={{
                              clipPath: BOTTOM_RIGHT_CLIP,
                        }}
                        className="absolute inset-0 grid place-content-center bg-neutral-900 text-pink-500"
                  >
                        <Icon className="text-xl sm:text-3xl md:text-4xl" />
                  </div>
            </a>
      );
};