import { IOPost } from "@/pages/posts/[id]";
import Head from "next/head";
import fs from 'fs';
import SearchBox from "@/components/SearchBox";
import { useState } from "react";
var randomColor = require('random-color');

const package_root_dir = process.cwd();
const postIndexPath = package_root_dir + '/posts_index.json';
const tagIndexPath = package_root_dir + '/tag_index.json';

export default function Home(props: { postIndex: { [key: string]: IOPost }, tagIndex: { [key: string]: string[] } }) {

  return (
    <div>
      <Head>
        <title>spurlockio</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="my personal knowledge graph" />
        <meta name="keywords" content="knowledge graph, knowledge, graph, spurlockio, ethan spurlock" />
        <meta name="author" content="Ethan Spurlock" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#F9FAFB" />
      </Head>
      <IndexSection postIndex={props.postIndex} tagIndex={props.tagIndex} />
      <div className="h-2 w-full max-w-3xl m-auto bg-neutral-50" />
      <AboutSection />
    </div>
  );
}

export function IndexSection(props: { postIndex: { [key: string]: IOPost }, tagIndex: { [key: string]: string[] } }) {

  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center p-2 bg-neutral-50 pb-16">
      <div className="flex flex-col w-full max-w-4xl ">
        <div className=" py-16 text-center">
          <p className="font-black text-neutral-700 text-3xl cursor-pointer" onClick={
            () => setOpenSearch(true)
          }>weird thoughts by a weird guy</p>
          <p className="font-light text-neutral-500 text-2xl">this is a copy of my public obsidian notebook</p>
        </div>
        <SearchBox openSearch={openSearch} setOpenSearch={setOpenSearch} />
        <div className="bg-white filter drop-shadow-md p-4">
          <h1 className="text-lg font-semibold font-mono text-neutral-900">Index</h1>
          <TagPostList tagIndex={props.tagIndex} postIndex={props.postIndex} />
        </div>
      </div>
    </div>
  )
}

function SearchBoxTombstone(props: { setOpenSearch: (open: boolean) => void, openSearch: boolean }) {
  return (
    <div className={`w-full py-8 flex justify-center ${props.openSearch && "hidden"} `}>
      <input className="h-12 w-full max-w-3xl  border border-neutral-300 bg-transparent  pl-11 pr-4 py-0 bg-white rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." onClick={
        () => props.setOpenSearch(true)
      } />
    </div>
  );
}

export function AboutSection() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center p-2 bg-neutral-50">
      <div className="w-full max-w-3xl">
        <div className=" filter bg-white drop-shadow-md p-12 flex flex-col gap-4 ">
          <h1 className="text-lg font-semibold font-mono text-neutral-900">About</h1>
          <p>
            This format was inspired by <a className="underline text-blue-600 px-1" href="https://www.amazon.com/Otaku-Database-Animals-Hiroki-Azuma/dp/0816653526" >"Otaku: Japan's Database Animals"</a> by Hiroki Azuma,
            <a href="https://www.amazon.com/Death-Moth-Other-Essays/dp/0156252341" className="underline text-blue-600 px-1">"The Death of a Moth" by Virginia Woolf</a> and
            <a href="https://obsidian.md" className="underline text-blue-600 px-1">Obsidian Notes</a>.

          </p>
          <blockquote className="border-l-4 prose-p:text-gray-500 border-gray-500 heropattern-texture-gray-300 bg-gray-50 font-medium p-4 text-sm">
            What consumers truly value and buy are the settings and the worldviews themselves as works. Therefore, a dual strategy is effected: although the actual commodities
            are grand narratives, it happens to be small narratives, which are fragments of grand narratives, that are sold as surrogate products.
            - Hiroki Azuma
          </blockquote>
          <blockquote className="border-l-4 prose-p:text-gray-500 border-gray-500 heropattern-texture-gray-300 bg-gray-50 font-medium p-4 text-sm">
            The success of the masterpieces seems to lie not so much in their freedom from faults — indeed we tolerate the grossest errors in them all — but in the immense persuasiveness of a mind which has completely mastered its perspective.
            - Virginia Woolf
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export function TagPostList(props: { tagIndex: { [key: string]: string[] }, postIndex: { [key: string]: IOPost } }) {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 px-2" >
      {Object.keys(props.tagIndex).map((tag) => {
        const tagColor = randomColor(0.9).hexString();
        return (
          <div key={tag} className="p-1 rounded-md">
            <h1 className="font-bold uppercase font-mono cursor-default px-2 text-white w-max" style={{ backgroundColor: tagColor }}>{tag}</h1>
            <ul className="p-1 border-t-2" style={{ borderColor: tagColor }}>
              {props.tagIndex[tag].map((post_id) => {
                const post = props.postIndex[post_id];
                return (
                  <li key={post_id} className="cursor-pointer text-neutral-500 hover:text-lime-700">
                    <a href={`/posts/${post_id}`}>{post.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {

  const tagIndex = JSON.parse(fs.readFileSync(tagIndexPath, 'utf8'));

  const postIndex = JSON.parse(fs.readFileSync(postIndexPath, 'utf8'));

  return {
    props: {
      postIndex,
      tagIndex,
    }
  }


}