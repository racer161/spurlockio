import { recFindByExt } from '../../util'
import fs from 'fs'
import Markdown from 'react-markdown'

const package_root_dir = process.cwd();
const vault_path = package_root_dir + '/vault/SPURLOCKIO';

//Root post renderer
//Loops through all obsidian markdown notes and renders them as posts

export default function Post({ post }: { post: string }) {

  return (
    <div>
      <Markdown>{post}</Markdown>
    </div>
  )
}

export async function getStaticPaths() {

  const paths = recFindByExt(vault_path, 'md').map((file: string) => {

    const file_full_path = file;

    const trimmed_file_path = file_full_path.substring(vault_path.length + 1).replace(/\.md$/, '').replace('/', '_')

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

  const fixed_file_path = params.id.replace('_', '/');

  //read file contents to string
  const post = fs.readFileSync(vault_path + '/' + fixed_file_path + '.md', 'utf8');

  // Pass post data to the page via props
  return { props: { post, trimmed_file_name } }
}