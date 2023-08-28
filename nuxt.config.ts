// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_API_TOKEN,
        apiOptions: { region: "us" },
      },
    ],
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-16",
      viewport: "initial-scale=1",
      title: "Oliver Au | Portfolio",
      meta: [
        // <meta name="description" content="My amazing site">
        { name: "description", content: "" },
      ],
    },
  },
  build: {
    transpile: ["gsap"],
  },
  css: ["@/styles/main.scss"],
});
