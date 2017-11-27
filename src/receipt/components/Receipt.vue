<template>

    <div class="receipt-component">
        <h3 class="receipt-component__title">{{ name }}</h3>
        <slot></slot>
    </div>

</template>

<script>
    import Eventbus from '../event-bus';

    export default {
        props: {
            name: {
                type: String,
                default: "My custom Invoice header"
            },
            currency: {
                type: String,
                default: 'EUR'
            }
        },
        methods: {
            getCurrency() {
                Eventbus.$emit('CURRENCY', this.currency);
            }
        },
        mounted() {
            this.getCurrency();
        }
    }
</script>
