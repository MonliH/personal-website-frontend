import { Fragment } from "react";
import Image from "next/image";
import homeSvg from "../../public/paths/home.svg";
import sep1Svg from "../../public/paths/sep1.svg";
import sep2Svg from "../../public/paths/sep2.svg";
import sideSvg from "../../public/paths/side.svg";
import speechSvg from "../../public/paths/speech.svg";
import jonathanImg from "../../public/jonathan_li_small.jpg";
import { hackathonProjects, papers, personalProjects, websites } from "./info";
import Link from "next/link";
import LenisScroller from "@/libs/LenisScroller";

export default function Home() {
  return (
    
    <main className="px-28 py-32">
      <LenisScroller/>
      <Image
        src={homeSvg}
        alt=""
        className="absolute top-0 left-16 w-[80%] pointer-events-none select-none"
      ></Image>
      <p className="text-4xl font-serif">Hello I'm</p>
      <h1 className="text-[115pt] font-bold mb-[600px]">Jonathan Li</h1>
      <p className="w-[31rem] text-2xl absolute top-[645px] left-[calc(7.5rem+49vw)]">
        I’ve been messing around making what I think is cool stuff—ai stuff,
        website designs, hackathon projects—for the past six years.
      </p>
      <div className="flex flex-row w-full gap-16 items-end">
        <div className="flex flex-col gap-3 w-80 text-sm flex-shrink-0">
          <h2 className="font-bold m-0 text-3xl">who am i?</h2>
          <p className="font-normal">
            I’m Jonathan, canadian ai researcher, web designer, computer
            programmer, entrepreneur, gymgoer, piano player...
          </p>
          <p className="font-normal">
            I started coding five years ago when I was captivated by the magic
            behind a neural network. Now I’ve graduated from high school,
            currently working at Cohere doing machine learning stuff.
          </p>
          <p className="font-normal">
            I’m trying to purse life’s big questions—which is probably why my
            interests bounce around so often, from AI (to assist our quest) to
            physics (to explain our world) to entrepreneurship (to fund our
            exploration)—though I’m honestly unlikely to succeed, at least on my
            own.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src={jonathanImg}
            alt="Image of me"
            className="w-[100%] h-auto"
          ></Image>
        </div>
      </div>
      <Image src={sep1Svg} alt="" className="absolute left-0 -mt-8"></Image>
      <div className="grid mt-40 grid-rows-[max-content_1fr] grid-cols-[max-content_1fr] gap-x-24 gap-y-16">
        <div>
          <h2 className="text-3xl font-bold">ai stuff</h2>
          <p>
            I've published a few papers as first author<br></br>@ Queen’s U,
            with{" "}
            <Link
              href="https://www.xiaodanzhu.com/"
              className="underline"
              target="_blank"
            >
              Prof. Xiaodan Zhu
            </Link>
          </p>
        </div>
        <div></div>
        <div></div>
        <div>
          {papers.map((paper, i) => (
            <Fragment key={i}>
              {i != 0 && <hr className="my-6 border-black" />}
              <div>
                <Link
                  href={paper.link}
                  className="text-2xl block mb-1.5"
                  target="_blank"
                >
                  {paper.title}
                </Link>
                <p>{paper.venue}</p>
                <p>
                  {paper.authors.map((author, i) => (
                    <Fragment key={i}>
                      {i != 0 && ", "}
                      {author == "Jonathan Li" ? <b>{author}</b> : author}
                    </Fragment>
                  ))}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <Image src={sep2Svg} alt="" className="absolute left-0 mt-24"></Image>
      <div className="mt-80 relative">
        <Image
          src={sideSvg}
          alt=""
          className="absolute -left-20 mt-6 h-full "
        ></Image>
        <div className="flex flex-row items-end gap-8 mb-20">
          <h2 className="font-bold text-3xl">design</h2>
          <p>
            A few years ago I started Riftium, a web design firm, with my
            brother. Here are some projects.
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-x-16 gap-y-20 ml-32 pb-24">
          {websites.map((website, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 flex-grow-0 basis-[500px]"
            >
              <Link href={website.link} target="_blank">
                <Image
                  src={website.image}
                  alt=""
                  className="w-full h-auto border-4 border-black"
                ></Image>
              </Link>
              <Link
                href={website.link}
                target="_blank"
                className="font-bold mt-4 mb-0 block"
              >
                {website.displayLink}
              </Link>
              <p>{website.description}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="font-bold text-3xl ml-2">
        selected personal/hackathon projects
      </h2>
      <div
        className={`grid grid-cols-[repeat(3,max-content)] grid-rows-${hackathonProjects.length} gap-y-2 mt-8 ml-4`}
      >
        {hackathonProjects.map((project, i) => (
          <Fragment key={i}>
            <Link
              href={project.link}
              target="_blank"
              className="font-bold text-lg pr-4"
            >
              {project.name}
            </Link>
            <p className="text-lg">{project.description}</p>
            <div>
              <p className="px-4 text-lg inline-block">|</p>
              <p className="text-lg inline-block">{project.result}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <hr className="border-black my-8 w-3/4"></hr>
      <div
        className={`grid grid-cols-[repeat(2,max-content)] grid-rows-${hackathonProjects.length} gap-y-2 mt-8 ml-4`}
      >
        {personalProjects.map((project, i) => (
          <Fragment key={i}>
            <Link
              href={project.link}
              target="_blank"
              className="font-bold text-lg pr-4"
            >
              {project.name}
            </Link>
            <p className="text-lg">{project.description}</p>
          </Fragment>
        ))}
      </div>
      <Image src={speechSvg} alt="" className="absolute left-0 -mt-24"></Image>
      <div className="mt-96 ml-[12.5rem]">
        <h2 className="font-bold text-3xl">jonathan li</h2>
        <p>
          Reach out to me via
          {" "}<Link href="mailto:li.jonathan42@gmail.com" className="underline">email</Link>{" "}
          (li.jonathan42@gmail.com) or{" "}
          <Link href="https://www.linkedin.com/in/jonatli/" target="_blank" className="underline">
            Linkedin
          </Link> for collaborations, questions, or just to chat.
        </p>
      </div>
    </main>
  );
}
