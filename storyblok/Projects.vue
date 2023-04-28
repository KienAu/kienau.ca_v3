<script setup>

    const data = defineProps({ blok: Object, darkmode: Boolean })

    let currentActiveSlide = ref(0)

    const slides = data.blok.your_work

    const handleSlideChange = (val) => {
        let direction
        const calculateNextSlide = currentActiveSlide.value + val

        if (val > 0) {
            direction = "next";
        } else {
            direction = "previous"
        }

        if (direction === "next" && calculateNextSlide < slides.length) {
            currentActiveSlide.value += val
        } else if (direction === "next") {
            currentActiveSlide.value = 0
        } else if (direction === "previous" && calculateNextSlide < 0) {
            currentActiveSlide.value = slides.length - 1
        } else {
            currentActiveSlide.value += val
        }
    }

</script>

<template>
    <section class="projects" id="Projects">
        <div class="container row projects__wrapper">
            <div class="column--is-w6 column--is-sm-w12">
                <h1 class="projects__title">
                    {{ blok.Title }}
                </h1>
                <div class="projects__content" v-for="(item, index) in blok.your_work" :key="item._uid" :class="{'projects__content--is-active' : index === currentActiveSlide }">
                    <span class="projects__highlight-text">{{ item.highlight_text }}</span>
                    <h2 class="projects__subtitle">{{ item.title }}</h2>
                    <p class="project__description">{{ item.description }}</p>
                    <NuxtLink class="projects__link" :to="item.link.cached_url" :target="item.link.target"> <span class="projects__link-text"> View Site </span></NuxtLink>
                </div>
                <div class="projects__control-panel" v-if="blok.your_work.length > 1">
                    <button class="projects__controller" @click="handleSlideChange(1)">Next</button>
                    <button class="projects__controller" @click="handleSlideChange(-1)">Prev</button>
                </div>
                <img class="projects__secondary-image" :class="{'projects__secondary-image--is-active' : index === currentActiveSlide }" v-for="(item, index) in blok.your_work" :key="item._uid" :src="item.image_secondary.filename"/>
            </div>
            <div class="column--is-w6 column--is-sm-w12">
                <div class="projects__image-wrap">
                    <img class="projects__image" v-for="(item, index) in blok.your_work" :key="item._uid" :src="item.image.filename" :class="{'projects__image--is-active' : index === currentActiveSlide }"/>
                </div>
            </div>
        </div>
    </section>
</template>