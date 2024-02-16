import Link from "next/link";
import { IconType } from "react-icons";
import { FaInstagram, FaGithub, FaFacebookMessenger, FaMailBulk, FaDiscord, FaSteam, FaSignal, FaLinkedin } from "react-icons/fa";


export default function Ethan() {

  return (
    <div>
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-neutral-800 text-white">
        <div className="w-full max-w-xl flex flex-col items-center">
          <div className="flex flex-col items-center mt-20">
            <h1 className="text-3xl font-bold ">Ethan Spurlock</h1>
            <div className="flex flex-row flex-wrap items-center justify-center p-2 text-neutral-400 divide-x">
              <p className="font-light pr-2 flex-shrink-0">Ranked Competitive ADHD Enjoyer</p>
              <p className="font-light px-2 flex-shrink-0">Software Engineer</p>
              <p className="font-light px-2 flex-shrink-0">Washed Casual Gamer</p>
              <p className="font-light px-2 flex-shrink-0">Motorcycle Abuser</p>
              <p className="font-light px-2 flex-shrink-0">Might release a game some day</p>
              <p className="font-light pl-2 flex-shrink-0">Book Reader</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 p-8 items-center justify-center justify-items-center w-max">
            <IconComponent href="https://www.instagram.com/spurlock161/" handle="spurlock161" Icon={FaInstagram} />
            <IconComponent href="https://spurlock.io/ethan" handle="racer161" Icon={FaDiscord} />
            <IconComponent href="https://www.github.com/racer161/" handle="racer161" Icon={FaGithub} />
            <IconComponent href="https://www.facebook.com/ethan.spurlock.90" Icon={FaFacebookMessenger} />
            <IconComponent href="mailto:ethan@spurlock.io" Icon={FaMailBulk} handle="email" />
            <IconComponent href="https://s.team/p/gmk-wjjv/drkrmbjv" handle="spurlock161" Icon={FaSteam} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconComponent(props: { href: string, Icon: IconType, handle?: string }) {
  return (
    <a href={props.href} target="_blank" className="flex flex-col items-center justify-center bg-neutral-700 rounded-lg aspect-square w-28 h-28">
      <props.Icon className="w-16 h-16" />
      {props.handle && <p className="text-sm text-neutral-500">@{props.handle}</p>}
    </a>
  );
}