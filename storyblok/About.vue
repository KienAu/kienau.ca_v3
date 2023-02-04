<script setup>
    const data = defineProps({ blok: Object })

    const sections = data.blok.sections

    let indexItem = ref(0)

    for (let i = 0; i < sections[3].list.length; i++) {
        indexItem.value = i
    }
</script>

<template>
    <section class="about">
        <div class="container row about__container">
            <div class="column--is-w6 column--is-md-w10 column--is-sm-w12">
                <section class="about__sections" v-for="section in blok.sections">
                   <div class="about__section about__section--is-info" v-if="section.component === 'Section Info'">
                        <span class="about__highlight-text">{{ section.highlight_text }}</span>
                        <p class="about__text">{{ section.text }}</p>
                   </div>
                   <div class="about__section about__section--is-list" v-else-if="section.component === 'Section List'">
                        <span class="about__highlight-text">{{ section.highlight_text }}</span>
                        <h2 class="about__subtitle">{{ section.subtitle }}</h2>
                        <ul class="about__list">
                            <li class="about__item" v-for="item in section.list">
                                <span class="about__item-text">{{ item.text }}</span>
                            </li>
                        </ul>
                   </div>
                   <div class="about__section about__section--is-step" v-else-if="section.component === 'Section Step'">
                        <span class="about__highlight-text">{{ section.highlight_text }}</span>
                        <h2 class="about__subtitle">{{ section.subtitle }}</h2>
                        <ul class="about__list">
                            <li class="about__item" v-for="(item, index) in section.list">
                                <span class="about__index"> {{ index + 1 }}.</span><span class="about__item-text">{{ item.text }}</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <div class="column--is-w6 row row--is-not column--is-md-w12">
                <div class="about__wrapper">
                    <h1 class="about__title">
                        {{ blok.title }}
                    </h1>
                    <div class="about__image-wrap">
                        <img class="about__image" :src="blok.image.filename" :alt="blok.image.alt"/>
                    </div>
                </div>
            </div>
        </div> 
    </section>
</template>