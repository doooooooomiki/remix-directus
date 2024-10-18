import { createDirectus, rest, readItem } from '@directus/sdk';

type Global = {
  title: string;
  description: string;
};

type Author = {
  name: string;
};

type Page = {
  title: string;
  content: string;
  slug: string;
};

type Post = {
  image: string;
  title: string;
  author: Author;
  content: string;
  published_date: string;
  slug: string;
};

type Schema = {
  posts: Post[];
  global: Global;
  pages: Page[];
};

const directus = createDirectus<Schema>('http://localhost:8055').with(rest());

export async function getPostById(id: string, version?: string) {
  return await directus.request(readItem('posts', id, { version }));
}

export default directus;
