import { recFindByExt } from '../../util'
import markdownit from 'markdown-it'
import fs from 'fs'

const md = markdownit('commonmark');
const package_root_dir = process.cwd();
const vault_path = package_root_dir + '/vault/SPURLOCKIO';

//Root post renderer
//Loops through all obsidian markdown notes and renders them as posts

export default function Post({ post }: { post: string }) {

  const content = md.render(post);

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export async function getStaticPaths() {

  const paths = recFindByExt(vault_path, 'md').map((file: string) => {

    const file_full_path = file;

    const trimmed_file_path = file_full_path.substring(vault_path.length + 1).replace(/\.md$/, '');

    console.log(trimmed_file_path);

    return {
      params: {
        id: trimmed_file_path
      },
    }
  });

  return {
    paths,
    fallback: false,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: { id: string, file_path: string, path: string } }) {

  console.log(params);

  const file_name = params.id.split('/').pop() ?? params.id;

  const trimmed_file_name = file_name.toLocaleLowerCase().replace(/\.md$/, '').replace(' ', '-');

  //read file contents to string
  const post = fs.readFileSync(vault_path + '/' + params.id + '.md', 'utf8');

  // Pass post data to the page via props
  return { props: { post, trimmed_file_name } }
}