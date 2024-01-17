import { PostComponent } from '@/Post/Post';
import { recFindByExt } from '@/server_util';
import fs from 'fs'

//TODO: generate a content index on page build
//https://github.com/jackyzha0/quartz/blob/f36376503a20f8b0697d72cf1e41dcf402020891/quartz/plugins/emitters/contentIndex.ts#L10


const package_root_dir = process.cwd();
const vault_path = package_root_dir + '/vault/SPURLOCKIO';
const AVERAGE_WORDS_PER_MINUTE = 200;

export interface IOPost {
  title: string,
  file_full_path: string,
}



//Root post renderer
//Loops through all obsidian markdown notes and renders them as posts

export default function Post({ markdown, title, ctime, mtime, readingTime }: { markdown: string, title: string, mtime: string, ctime: string, readingTime: number }) {

  return (<PostComponent markdown={markdown} title={title} created={new Date(ctime)} updated={new Date(mtime)} readingTime={readingTime} />);
}

export async function getStaticPaths() {

  var posts: { [key: string]: IOPost } = {};

  var tag_index: { [tag: string]: string[] } = {};

  const paths = recFindByExt(vault_path, 'md').map((file: string) => {

    const file_full_path = file;

    const file_name = file.split('/').pop() ?? file;

    const trimmed_file_name = file_name.replace('.md', '');

    const id = trimmed_file_name.replace(/ /g, '-').toLowerCase();

    const file_string = fs.readFileSync(file, 'utf8');

    //use regex to match '#tag' at the beginning of the file, but not markdown headers '# header' or '#### header'
    const has_tags = file_string.match(/^#[^#]/) !== null;

    if (has_tags) {
      const tags = file_string.split('\n')[0].split(' ')
        .filter((tag) => tag !== '')
        //remove the # from the tags
        .map((tag) => tag.substring(1));

      tags.forEach((tag) => {
        if (tag_index[tag] === undefined) {
          tag_index[tag] = [];
        }

        tag_index[tag].push(id);
      });
    }

    const post: IOPost = {
      title: trimmed_file_name,
      file_full_path: file_full_path,
    };

    if (posts[id] !== undefined) {
      throw new Error(`Duplicate post id: ${id}`);
    }

    posts[id] = post;

    return {
      params: {
        id: id,
      },
    }
  });

  //write out the posts index to a file
  fs.writeFileSync(package_root_dir + '/posts_index.json', JSON.stringify(posts));

  fs.writeFileSync(package_root_dir + '/tag_index.json', JSON.stringify(tag_index));

  return {
    paths,
    fallback: false,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: { id: string } }) {

  const posts_string = fs.readFileSync(package_root_dir + '/posts_index.json', 'utf8');

  const posts: { [key: string]: IOPost } = JSON.parse(posts_string);

  const post: IOPost | undefined = posts[params.id];

  const markdown = fs.readFileSync(post?.file_full_path ?? '', 'utf8');

  const { mtime, ctime } = fs.statSync(post?.file_full_path ?? '');

  const wordCount = getWordCount(markdown);


  // Pass post data to the page via props
  return {
    props:
    {
      markdown: markdown,
      title: post?.title ?? '',
      mtime: mtime.toISOString(),
      ctime: ctime.toISOString(),
      readingTime: Math.ceil(wordCount / AVERAGE_WORDS_PER_MINUTE),
    }
  }
}

function getWordCount(markdown: string): number {
  return markdown.split(' ').length;
}