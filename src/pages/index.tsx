import { IOPost } from "@/pages/posts/[id]";
import Head from "next/head";
import fs from 'fs';

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
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="w-screen h-screen flex items-center justify-center">
        <div>
          <div className="w-64 h-64 border-2 border-black rounded-md p-4">
            <h1 className="font-black">Latest</h1>
            <TagPostList tagIndex={props.tagIndex} postIndex={props.postIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TagPostList(props: { tagIndex: { [key: string]: string[] }, postIndex: { [key: string]: IOPost } }) {
  return (
    <div>
      {Object.keys(props.tagIndex).map((tag) => {
        return (
          <div key={tag}>
            <h1 className="font-bold">{tag}</h1>
            <ul>
              {props.tagIndex[tag].map((post_id) => {
                const post = props.postIndex[post_id];
                return (
                  <li key={post_id}>
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