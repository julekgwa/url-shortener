import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { nanoid } from 'nanoid';

import {db} from './db'
import { shortener } from './db/schema';
import { eq } from 'drizzle-orm';

const server = new Elysia().use(html()).use(staticPlugin());

server.get('/', () => {
  return new Response(Bun.file('./src/index.html'))
});

server.post('/shorten', async ({body: {url}}) => {

  if(!url) {
    throw new Error('URL is required')
  }

  const urlId = nanoid(7);

  await db.insert(shortener).values({ url, urlId})

  return `<section id="results"
  class="flex mt-32 w-full border-slate-200 overflow-hidden border pl-2 rounded-full items-center justify-between">
  <p id="url">https://bunshortly.fly.dev/shorten/${urlId}</p>

  <div class="bg-slate-200 py-3 px-6 cursor-pointer" hx-on="click: copyText()">
    Copy
  </div>
  </section>`

}, {
  body: t.Object({
    url: t.String()
  })
})

server.get('/shorten/:id', async ({params: {id}, set}) => {

  const url = await db.select().from(shortener).where(eq(shortener.urlId, id)).get()

  if (!url) {
    throw new Error('URL is required')
  }

  set.redirect = url.url

});

server.listen(3000)

console.log(
  `🦊 Elysia is running at ${server.server?.hostname}:${server.server?.port}`
);
