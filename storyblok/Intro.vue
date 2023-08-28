<script setup>
const prop = defineProps({ blok: Object });
</script>

<template>
  <section class="home" id="Home">
    <div class="container row home__wrapper">
      <div class="column--is-w7 column--is-md-w12">
        <h1 class="home__title">
          {{ blok.name }}
        </h1>
        <h3 class="home__subtitle">
          <span>{{ blok.work_title }}</span>
        </h3>
      </div>
      <div class="column--is-w5 column--is-md-w12">
        <picture>
          <source
            media="(max-width: 1024px)"
            :srcset="blok.mobile_image.filename"
          />
          <source :srcset="blok.image.filename" />
          <img class="home__image" :src="blok.image.filename" />
        </picture>
      </div>
    </div>
  </section>
</template>
