import { Head } from 'next/document';
import Markdown from 'react-markdown'
var randomColor = require('random-color');

export function PostComponent(props: { markdown: string, title: string, created: Date, updated: Date, readingTime: number }) {


  //tags are always the first line of a post
  const tags = props.markdown.split('\n')[0].split(' ').filter((tag) => tag !== '');

  const tagComponents = tags.map((tag) => <TagComponent key={tag} tag={tag} />);

  //remove tags from markdown
  const markdown = props.markdown.split('\n').slice(1).join('\n');

  return (
    <div className='w-screen min-h-screen flex items-center justify-center pt-10 bg-neutral-50'>
      <div className='w-full lg:max-w-4xl mb-10'>
        <div className='filter drop-shadow-md mt-2 p-4 sm:p-8  bg-white'>
          <div className=' w-full mb-4'>
            <div className=''>
              <h1 className='text-3xl font-mono text-black select-none mb-1'>{props.title}</h1>
              <div className='grid sm:grid-cols-4 divide-black'>
                <p className='font-mono text-gray-800 text-xs w-max'>written by <a className='underline' href='https://ethan.spurlock.io'>Ethan Spurlock</a></p>
                <p className='font-mono text-gray-800 text-xs w-full sm:text-center'>created on {props.created.toLocaleDateString()}</p>
                <p className='font-mono text-gray-800 text-xs sm:text-center w-full'>last updated on {props.updated.toLocaleDateString()}</p>
                <p className='font-mono text-gray-800 text-xs w-full sm:text-center'>{props.readingTime} minute read</p>
              </div>
            </div>
          </div>
          <Markdown components={components} className="bg-white text-gray-900">{markdown}</Markdown>
          <div className='flex-row flex-grow flex gap-1'>
            {tagComponents}
          </div>
          <GraphDisclaimer />
        </div>
      </div>
    </div>
  );
}

function GraphDisclaimer() {
  return (
    <div className='border-4 border-yellow-300 mt-8 p-4 rounded-xl '>
      <p className='font-bold text-gray-600 text-sm'>
        What is this?
      </p>
      <p className=' font-light text-gray-500 text-sm text-justify'>
        I use this site as a place to write down and work through my thoughts for the sake of completeness
        and so I can link/refer back to explanations. I have included some notes that some might consider BASIC AF 🧐.
        This is my knowledge graph not wikipedia.
      </p>
    </div>
  );
}

const components = {
  em(props: any) {
    return <span className="italic font-light text-gray-800">{props.children}</span>
  },
  p(props: any) {
    return <p className=" text-gray-800 font-serif my-2 text-justify">{props.children}</p>
  },
  li(props: any) {
    return <li className=" text-gray-800 pl-8 font-serif text-justify"><span className='text-xl font-bold px-2'>•</span>{props.children}</li>
  },
  blockquote(props: any) {
    return <blockquote className=" border-l-4 prose-p:text-gray-500 border-gray-500 heropattern-texture-gray-300 bg-gray-50 font-medium p-4 text-sm">{props.children}</blockquote>
  },
  h2(props: any) {
    return (
      <div className='w-full border-b-2 mb-4 mt-4 border-red-500'>
        <h2 className="text-lg sm:text-2xl font-bold text-white w-max p-1 bg-red-500">
          {props.children}
        </h2>
      </div>
    )
  },
  h3(props: any) {
    return (
      <div className='w-full border-b-2 mb-4 mt-4 border-sky-500'>
        <h3 className="text-md sm:text-xl font-bold  text-white w-max p-1 bg-sky-500">
          {props.children}
        </h3>
      </div>
    )
  },
  h4(props: any) {
    return (
      <div className='w-full border-b-2 mt-4 mb-2 border-lime-500' >
        <h4 className="font-mono font-semibold text-white w-max p-1 bg-lime-500" >
          {props.children}
        </h4>
      </div>
    )
  }
}

function TagComponent(props: { tag: string }) {

  const color = randomColor(0.60).hexString();
  return (
    <p
      className="font-mono text-white text-xs px-0.5 cursor-pointer select-none hover:bg-black"
      style={{
        backgroundColor: color,
      }}>
      {props.tag}
    </p>
  )
}