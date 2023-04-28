<script setup>
    const { gsap } = useGsap()

    const props = defineProps(['pageTransition'])

    const pageTransition = (variable) => {
        if (variable === true) {
            gsap.to('#Page', {
                duration: .5,
                opacity: 0,
                delay: 0,
            })
        } else {
            gsap.to('#Page', {
                duration: .5,
                opacity: 1,
                delay: 1,
            })
        }
    }


    onMounted(() => {
        const mouse = document.getElementById('mouse')

        document.body.onpointermove = (event) => {
            const { clientX, clientY } = event

            mouse.style.left = `${clientX}px`
            mouse.style.top = `${clientY}px`
        }

        document.addEventListener('mousedown', () => {
            mouse.classList.add('mouse--is-clicked')
        })

        document.addEventListener('mouseup', () => {
            mouse.classList.remove('mouse--is-clicked')
        })

        pageTransition()
    })
</script>

<template>
    <div class="main">
        <div id="mouse"></div>
        <Header @page-transition="pageTransition" />
        <slot />
        <Aside />
        <Footer />
    </div>
</template>

