<script setup>
    import Hamburger from '~/components/Hamburger.vue'
    
    const storyblokApi = useStoryblokApi()
    
    const { data } = await storyblokApi.get('cdn/stories/config', {
        version: 'draft',
        resolve_links: 'url',
    })

    const { gsap } = useGsap()
    let isMenuOpen = ref(false)
    const headerMenu = ref(null)
    const emit = defineEmits(['page-transition'])
    const isSmallMobile = ref(false)
    const isBigMobile = ref(false)
    const isTablet = ref(false)
    const isLaptop = ref(false)
    const isDesktop = ref(false)
    const isTwoK = ref(false)

    headerMenu.value = data.story.content.header_menu

    const onToggle = () => {
        isMenuOpen.value = !isMenuOpen.value
        emit('page-transition', isMenuOpen.value)
        linkAnimation()
    }

    const linkAnimation = () => {
        if (isMenuOpen.value === true) {
            gsap.set('.navigation__link', {
                y: 0,
            })

            gsap.from('.navigation__link', {
                duration: .5,
                y: 100,
                delay: 1,
            })
        } else {
            gsap.to('.navigation__link', {
                duration: .5,
                y: 100,
                delay: 0,
            })
        }
    }

    const onToggleLink = (e) => {
        if (isTablet.value) {
            if (document.querySelector('.navigation__list').dataset.prevValue === e.target.textContent) {
                isMenuOpen.value = !isMenuOpen.value
                linkAnimation()
            } else {
                onToggle()
                document.querySelector('.navigation__list').dataset.prevValue = e.target.textContent
            }
        }

    }

    const handleResize = () => {
        const windowWidth = window.innerWidth
        isSmallMobile.value = windowWidth < 768
        isBigMobile.value = windowWidth <= 768 
        isTablet.value = windowWidth <= 1024 
        isLaptop.value = windowWidth <= 1440 
        isDesktop.value = windowWidth <= 1920 
        isTwoK.value = windowWidth <= 2560
    }

    onMounted(() => {
        const page = document.querySelector('#Page section')
        document.querySelector('.navigation__list').dataset.prevValue = page.getAttribute('id')

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

        window.addEventListener('resize', () => {
            handleResize()
            if (isTablet.value === true && isMenuOpen.value == true) {
                isMenuOpen.value = false
                emit('page-transition', isMenuOpen.value)
            }
        })
        handleResize()
    })

    // Remove event listener on component unmount
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
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

            <nav class="navigation" :class="isMenuOpen ? 'navigation--is-open' : ''">
                <ul class="navigation__list" data-prev-value="">
                    <li class="navigation__item" v-for="blok in headerMenu" :key="blok.uid">
                        <NuxtLink class="navigation__link" :to="blok.link.story.url" @click="onToggleLink">
                            <span class="navigation__transition-text"></span><span class="navigation__text">{{ blok.link.story.name }}</span><span class="navigation__highlight"></span>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>

            <Hamburger @click="onToggle" :isMenuOpen="isMenuOpen" />
        </div>
    </header>
</template>