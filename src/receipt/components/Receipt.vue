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
            },
            symbol: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            getCurrency() {
                Eventbus.$emit('CURRENCY', { currencyType: this.currency, currencySymbol: this.symbol });
            }
        },
        mounted() {
            this.getCurrency();
        }
    }
</script>
