<script setup>
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories/config', {
        version: 'draft',
        resolve_links: 'url',
    })
    
    const copyright = ref(null)

    copyright.value = data.story.content.copyright

    const { gsap } = useGsap()

    onMounted(() => {
        gsap.from('.footer', {
            opacity: 0,
            delay: 2.7,
            duration: .5
        })
        
        gsap.from('.footer__transition-text', {
            delay: 2.5,
            duration: .5,
            scaleX: 0,
            transformOrigin: 'left',
        })

        gsap.to('.footer__transition-text', {
            delay: 3.25,
            duration: .5,
            transformOrigin: 'right',
            scaleX: 0,
        })
    })

</script>

<template>
    <footer class="footer">
        <span class="footer__text">
            © {{ copyright }}<span class="footer__transition-text"></span>
        </span>
    </footer>
</template>