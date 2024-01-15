import { Component } from 'react';
import Markdown from 'react-markdown'
var randomColor = require('random-color');

export function PostComponent(props: { markdown: string, title: string }) {


  //tags are always the first line of a post
  const tags = props.markdown.split('\n')[0].split(' ').filter((tag) => tag !== '');

  const tagComponents = tags.map((tag) => <TagComponent key={tag} tag={tag} />);

  //remove tags from markdown
  const markdown = props.markdown.split('\n').slice(1).join('\n');

  return (
    <div className='w-screen flex items-center justify-center pt-10 bg-gray-50'>
      <div className='w-full lg:max-w-4xl mb-10'>
        <div className='filter drop-shadow-md mt-2 p-4 pb-0 sm:p-8 sm:pb-0  bg-white'>
          <div className=' w-full mb-4'>
            <div className='p-4 pl-1'>
              <h1 className='text-3xl font-sans font-bold text-black select-none'>{props.title}</h1>
              <p className='font-mono text-gray-400 text-xs underline'>by <a href='https://ethan.spurlock.io'>Ethan Spurlock</a></p>
            </div>
            <div className='flex-row flex gap-1 pt-2 heropattern-texture-gray-400 p-2'>
              {tagComponents}
            </div>
          </div>
          <Markdown components={components} className="bg-white text-gray-900">{markdown}</Markdown>
          <GraphDisclaimer />
        </div>
      </div>
    </div>
  );
}

function GraphDisclaimer() {
  return (
    <div className='border-4 border-b-0 border-yellow-300 mt-16 p-4 rounded-t-xl '>
      <p className='font-bold text-gray-600 text-sm'>
        What is this place?
      </p>
      <p className=' font-light text-gray-500 text-sm text-justify'>
        I use this site as a place to write down and work through my thoughts for the sake of completeness
        and so I can link/refer back to explanations. I have included some notes that some might consider BASIC AF 🧐
        This is my knowledge graph not wikipedia.
      </p>
    </div>
  );
}

const components = {
  em(props: any) {
    return <p className="italic font-light text-gray-800">{props.children}</p>
  },
  p(props: any) {
    return <p className=" text-gray-800 font-serif my-2 text-justify">{props.children}</p>
  },
  li(props: any) {
    return <li className=" text-gray-800 pl-8 font-serif text-justify"><span className='font-bold px-2'>•</span>{props.children}</li>
  },
  blockquote(props: any) {
    return <blockquote className=" border-l-4 prose-p:text-gray-500 border-gray-500 bg-gray-100 font-medium p-4 text-sm">{props.children}</blockquote>
  },
  h2(props: any) {
    return (
      <div className='w-full border-b-2 mb-4 mt-8 border-red-400'>
        <h2 className="text-lg sm:text-2xl font-bold text-white w-max p-1 bg-red-400">
          {props.children}
        </h2>
      </div>
    )
  },
  h3(props: any) {
    return (
      <div className='w-full border-b-2 mb-4 mt-8 border-sky-400'>
        <h3 className="text-md sm:text-xl font-bold  text-white w-max p-1 bg-sky-400">
          {props.children}
        </h3>
      </div>
    )
  },
  h4(props: any) {
    return (
      <div className='w-full border-b-2 mt-6 mb-2 border-lime-400' >
        <h4 className="font-mono font-semibold text-white w-max p-1 bg-lime-400" >
          {props.children}
        </h4>
      </div>
    )
  }
}

function TagComponent(props: { tag: string }) {
  const color = randomColor().hexString();
  return (
    <p className=" bg-gray-50 text-gray-500 font-mono filter drop-shadow text-xs px-2 py-1 cursor-pointer select-none hover:bg-gray-400" >
      {props.tag}
    </p>
  )
}