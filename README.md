<h1 align="center">Genius - SaaS AI Platform</h1>

<p align="center">
  <img width="100" alt="Compresso Logo" src="https://github.com/Yash-Sajwan24/ai-sass/blob/main/public/logo.png">

</p>

<p align="center">
  Introducing our cutting-edge SaaS AI Platform, a revolutionary solution at the intersection of creativity and technology, seamlessly integrating powerful tools from OpenAI and Replicate AI. This platform is designed to empower users across various industries with unprecedented capabilities in content creation and innovation.
</p>


https://github.com/Yash-Sajwan24/ai-sass/assets/52412969/46a25d2c-d9ba-4782-bb5a-f0d3c6fd17b8



## Tech Stack 
- Next.js
- React
- Tailwind
- Prisma
- Stripe
- Shadcn/ui
- Clerk Authentication
- Open AI
- Replicate AI
- Crisp

## Key Features:

- <strong>Image Generation Tool: </strong>
Unleash the power of artificial intelligence to create stunning visuals and graphics effortlessly. The Image Generation Tool harnesses the advanced capabilities of OpenAI to transform concepts into captivating images.

- <strong>Video Generation Tool:</strong>
Elevate your storytelling with the Video Generation Tool powered by Replicate AI. Craft engaging and dynamic videos with ease, whether for marketing campaigns, training modules, or entertainment. Replicate AI's advanced algorithms ensure realistic and compelling video content, enabling you to convey your message effectively in a visually immersive format.

- <strong>Conversation Generation Tool :</strong>
Revolutionize your customer interactions and content creation process with the Conversation Generation Tool. Powered by OpenAI, this tool allows you to generate natural and contextually relevant conversational text.

- <strong>Music Generation Tool :</strong>
Elevate your audio experiences with the Music Generation Tool by Replicate AI. Whether you're a musician looking for inspiration or a content creator in need of unique soundtracks, this tool provides a diverse range of musical compositions. Tailor your music to fit various moods, genres, and styles, enabling you to enhance your projects with original and captivating soundscapes.

- <strong>Code Generation Tool :</strong>
Simplify and expedite your coding processes with the Code Generation Tool powered by OpenAI. Streamline the development cycle by generating high-quality code snippets, prototypes, or even complete modules. This tool is an invaluable asset for developers, allowing them to focus on the core aspects of their projects while leveraging AI assistance to handle routine coding tasks efficiently.

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/Yash-Sajwan24/ai-sass.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma db push

```

```shell
Npx prisma generate

```

### Start the app

```shell
npm run dev
```
```shell
stripe listen --forward-to localhost:3000/api/webhook
```
```shell
npx prisma studio
```

