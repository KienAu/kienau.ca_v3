<script setup>

    const data = defineProps({ blok: Object, darkmode: Boolean })

    let currentActiveSlide = ref(0)

    const slides = data.blok.your_work
    
    const isVideo = (filename) => {
        if (filename.includes('.mp4')) {
            return true
        } else {
            return false
        }
    }

    const { gsap } = useGsap()

    const handleSlideChange = (val) => {
        let direction
        const calculateNextSlide = currentActiveSlide.value + val
        const buttons = document.querySelectorAll('.projects__controller')

        buttons.forEach((btn) => {
            btn.disabled = true
        })

        if (val > 0) {
            direction = "next"
        } else {
            direction = "previous"
        }

        setTimeout(() => {
            if (direction === "next" && calculateNextSlide < slides.length) {
                currentActiveSlide.value += val
            } else if (direction === "next") {
                currentActiveSlide.value = 0
            } else if (direction === "previous" && calculateNextSlide < 0) {
                currentActiveSlide.value = slides.length - 1
            } else {
                currentActiveSlide.value += val
            }

            setTimeout(() => {
                buttons.forEach((btn) => {
                    btn.disabled = false
                })
            }, 1000)

        }, 1000)

        transitionSlider()
    }

    const transitionSlider = () => {
        gsap.fromTo('.projects__image-transition', {
            duration: .5,
            width: 0,
            left: 0,
            right: 'unset'
        }, {
            duration: .5,
            width: '100%',
        })
        gsap.to('.projects__image-transition', {
            duration: .5,
            width: 0,
            delay: 1,
            left: 'unset',
            right: 0
        })

        gsap.fromTo('.projects__showcase-transition', {
            duration: .5,
            width: 0,
            left: 0,
            right: 'unset'
        }, {
            duration: .5,
            width: '100%',
        })
        gsap.to('.projects__showcase-transition', {
            duration: .5,
            width: 0,
            delay: 1,
            left: 'unset',
            right: 0
        })
    }

</script>

<template>
    <section class="projects" id="Projects">
        <div class="container row projects__wrapper">
            <h1 class="projects__title projects__title--is-mobile">
                {{ blok.Title }}
            </h1>
            <div class="column--is-w6 column--is-sm-w12">
                <h1 class="projects__title projects__title--is-desktop">
                    {{ blok.Title }}
                </h1>
                <div class="projects__content" v-for="(item, index) in blok.your_work" :key="item._uid" :class="{'projects__content--is-active' : index === currentActiveSlide }">
                    <span class="projects__highlight-text">{{ item.highlight_text }}</span>
                    <h2 class="projects__subtitle">{{ item.title }}</h2>
                    <p class="project__description">{{ item.description }}</p>
                    <NuxtLink v-if="item.link.cached_url" class="projects__link" :to="item.link.cached_url" :target="item.link.target"> 
                        <span class="projects__link-text"> View Site </span>
                    </NuxtLink>
                </div>
                <div class="projects__control-panel" v-if="blok.your_work.length > 1">
                    <button class="projects__controller" @click="handleSlideChange(-1)">Prev</button>
                    <button class="projects__controller" @click="handleSlideChange(1)">Next</button>
                </div>
                <div class="projects__showcase">
                    <div class="projects__showcase-transition"></div>
                    <div class="projects__showcase-inner" v-for="(item, index) in blok.your_work" :key="item._uid">
                        <video class="projects__video" autoplay muted loop v-if="isVideo(item.image_secondary.filename) === true" :class="{'projects__video--is-active' : index === currentActiveSlide }">
                            <source :src="item.image_secondary.filename" type="video/mp4">
                        </video>
                        <img class="projects__secondary-image" :class="{'projects__secondary-image--is-active' : index === currentActiveSlide }" :src="item.image_secondary.filename" v-else/>
                    </div>
                </div>

            </div>
            <div class="column--is-w6 column--is-sm-w12">
                <div class="projects__image-wrap">
                    <div class="projects__image-transition"></div>
                    <img class="projects__image" v-for="(item, index) in blok.your_work" :key="item._uid" :src="item.image.filename" :class="{'projects__image--is-active' : index === currentActiveSlide }"/>
                </div>
            </div>
        </div>
    </section>
</template>