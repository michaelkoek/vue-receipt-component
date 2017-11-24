<template>

    <div class="invoice-component">
        <div class="content-box">
            <h3 class="invoice-component__title">{{ name }}</h3>
            <slot></slot>
            <slot name="summary"></slot>
        </div>
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
