<script setup>
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories/config', {
        version: 'draft',
        resolve_links: 'url',
    })

    const mobileMenuIsOpen = ref(false)

    const headerMenu = ref(null)
    headerMenu.value = data.story.content.header_menu

    const { gsap } = useGsap()

    onMounted(() => {
        gsap.from('.header__border-top', {
            width: 0,
            x: 0,
            duration: 1.5
        })

        gsap.to('.header__border-top', {
            width: '100%',
            x: 0,
            duration: 1.5
        })

        gsap.from('.header__logo', {
            opacity: 0,
            delay: 1.5,
            duration: .5
        })

        gsap.from('.navigation__item', {
            opacity: 0,
            delay: 1.65,
            duration: .5
        })

        gsap.from('.navigation__transition-text', {
            delay: 1.65,
            duration: .5,
            scaleX: 0,
            transformOrigin: 'left',
        })

        gsap.to('.navigation__transition-text', {
            delay: 2.55,
            duration: .5,
            transformOrigin: 'right',
            scaleX: 0,
        })

        gsap.to('.navigation__text', {
            delay: 2.6,
            duration: .5,
            opacity: 1
        })

        const menuBtn = document.querySelector('.header__hamburger')

        menuBtn.addEventListener('click',() => {

            if (mobileMenuIsOpen.value === true) {

                gsap.set('.navigation__item', {
                    opacity: 1
                })

                gsap.from('.navigation__link', {
                    duration: .5,
                    y: 100,
                    delay: 1,
                })
            } 
        })

    })

</script>

<template>
    <header class="header">
        <span class="header__border-top"></span>
        <div class="header__wrapper">
            <div class="header__logo">
                <NuxtLink class="header__link" to="/">
                    <img class="header__logo__image header__logo__image--is-dark" src="../assets/icons/logo.svg" />
                    <img class="header__logo__image header__logo__image--is-light" src="../assets/icons/logo-light.svg" />
                </NuxtLink> 
            </div>
            <nav v-if="headerMenu" class="navigation" :class="mobileMenuIsOpen ? 'navigation--is-open' : ''">
                <ul class="navigation__list">
                    <li class="navigation__item" v-for="blok in headerMenu" :key="blok.uid">
                        <NuxtLink class="navigation__link" :to="blok.link.cached_url" @click="mobileMenuIsOpen = !mobileMenuIsOpen">
                            <span class="navigation__transition-text"></span><span class="navigation__text">{{ blok.link.story.name }}</span><span class="navigation__highlight"></span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <div class="header__hamburger" :class="mobileMenuIsOpen ? 'header__hamburger--is-open' : ''" @click="mobileMenuIsOpen = !mobileMenuIsOpen">
                <span class="header__hamburger__text"></span>
                <span class="header__hamburger__icon">
                    <span class="header__hamburger__icon__default">
                        <span></span>
                        <span></span>
                    </span>
                    <span class="header__hamburger__icon__close">
                        <span></span>
                        <span></span>
                    </span>
                </span>
            </div>
        </div>
    </header>
</template>