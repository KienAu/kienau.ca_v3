<script setup>
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? slug.join("/") : "home",
  { version: "published" }
);

const { gsap } = useGsap();

onMounted(() => {
  gsap.from("#Page", {
    duration: 0.5,
    opacity: 0,
    delay: 1,
  });

  gsap.to("#Page", {
    duration: 0.5,
    opacity: 1,
    delay: 1,
  });
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
