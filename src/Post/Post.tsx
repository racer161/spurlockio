import { Component } from 'react';
import Markdown from 'react-markdown'
var randomColor = require('random-color');

export function PostComponent(props: { markdown: string, title: string }) {
  return (
    <div className='w-screen flex items-center justify-center mt-10'>
      <div className='w-full lg:max-w-3xl'>
        <div className='filter drop-shadow-md mt-2 p-4 sm:p-8  bg-white'>
          <div className=' w-full mb-8 '>
            <h1 className='text-xl font-mono font-semibold text-gray-700'>{props.title}</h1>
            <p className='font-mono text-gray-500 text-sm'>by Ethan Spurlock</p>
          </div>
          <Markdown components={components} className="bg-white text-gray-900">{props.markdown}</Markdown>
        </div>
      </div>
    </div>
  );
}

const h3_color = randomColor();
const h4_color = randomColor();

const components = {
  em(props: any) {
    return <p className="italic font-light text-gray-800">{props.children}</p>
  },
  p(props: any) {
    return <p className=" text-gray-700 font-sans my-2">{props.children}</p>
  },
  li(props: any) {
    return <li className=" text-gray-700 font-sans font-semibold"><span className='font-bold px-2'>•</span>{props.children}</li>
  },
  h3(props: any) {
    return (
      <div className='w-full border-b-2 mb-4 mt-8' style={{ borderColor: h3_color.hexString() }}>
        <h3 className="text-md sm:text-xl font-bold  text-white w-max p-1" style={
          {
            backgroundColor: h3_color.hexString()
          }
        }>
          {props.children}
        </h3>
      </div>
    )
  },
  h4(props: any) {
    return (
      <div className='w-full border-b-2 mt-6 mb-2' style={{ borderColor: h4_color.hexString() }}>
        <h4 className="font-mono font-semibold text-white w-max p-1" style={
          {
            backgroundColor: h4_color.hexString()
          }
        }>
          {props.children}
        </h4>
      </div>
    )
  }
}