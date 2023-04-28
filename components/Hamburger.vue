<template>
    <div class="header__hamburger" :class="props.isMenuOpen ? 'header__hamburger--is-open' : ''">
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
</template>

<script setup>
    const emit = defineEmits(['toggleMenu'])
    const props = defineProps({
        isMenuOpen: Boolean,
    });

</script>