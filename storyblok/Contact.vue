<script setup>
    const data = defineProps({ blok: Object })
</script>

<template>
    <section class="contact" id="contact">
        <div class="container row contact__wrapper">
            <div class="column--is-w4 column--is-md-w12">
                <span class="contact__highlight-text">{{ blok.media_title }}</span>
                <ul class="contact__list">
                    <li class="contact__item">{{ blok.phone }}</li>
                    <li class="contact__item">{{ blok.email }}</li>
                    <li class="contact__item" v-for="item in blok.media" :key="item._uid">
                        <NuxtLink class="contact__link" :to="item.link.cached_url" :target="item.link.target">
                            <img :src="item.icon.filename" /> <span class="contact__link-text">{{ item.username }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="column--is-w8 column--is-md-w12">
                <h1 class="contact__title">{{ blok.title }}</h1>
                <p class="contact__text">{{ blok.text }}</p>
            </div>
        </div> 
    </section>
</template>