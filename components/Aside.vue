<script setup>
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories/config', {
        version: 'draft',
        resolve_links: 'url',
    })

    
    const socialMedia = ref(null)
    const socialTitle = ref(null)
    const darkModeMedia = ref(null)
    socialMedia.value = data.story.content.media
    socialTitle.value = data.story.content.media_title
    darkModeMedia.value = data.story.content.dark_mode

    const { gsap } = useGsap()

    onMounted(() => {
        gsap.from('.aside', {
            opacity: 0,
            delay: 2,
            duration: .5
        })

        gsap.to('.aside__text', {
            x: 0,
            delay: 2.5,
            duration: .5,
            ease: 'circ'
        })

    })
</script>

<template>
    <aside class="aside">
        <div class="aside__text-wrap">
            <span class="aside__text">{{ socialTitle }}</span>
        </div>
        <span class="aside__line">
        </span>
        <ul class="aside__social-media aside__social-media--is-dark">
            <li class="aside__social-media__item" v-for="item in socialMedia" :key="item._uid">
                <NuxtLink :to="item.link.cached_url" :target="item.link.target" class="aside__social-media__link">
                    <img :src="item.icon.filename" :alt="item.icon.alt" />
                </NuxtLink>
            </li>
        </ul>
        <ul class="aside__social-media aside__social-media--is-light">
            <li class="aside__social-media__item" v-for="item in darkModeMedia" :key="item._uid">
                <NuxtLink :to="item.link.cached_url" :target="item.link.target">
                    <img :src="item.icon.filename" :alt="item.icon.alt" />
                </NuxtLink>
            </li>
        </ul>
    </aside>
</template>