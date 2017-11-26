<template>
    <ul class="invoice-component__list invoice-component__products">
        <li class="invoice-component__item" v-for="(item, index) in products">
            {{ item.name }} - {{ priceSign(item.price) }}
        </li>
    </ul>
</template>

<script>

    import Eventbus from '../event-bus';

    export default {
        data() {
            return {
                currency_symbols: {
                    'USD': '$', // US Dollar
                    'EUR': '€', // Euro
                    'GBP': '£', // British Pound Sterling
                    'JPY': '¥', // Japanese Yen
                },
                currency_default: 'YEN'
            }
        },
        props: {
            products: {
                type: Array,
                required: true
            }
        },
        computed: {
            currencySymbol() {
                if (!this.currency_symbols[this.currency_default]) {
                    return this.currency_default;
                } else {
                    return this.currency_symbols[this.currency_default];
                }
            }
        },
        mounted() {
            Eventbus.$on('CURRENCY', (currencyType) => {
                this.currency_default = currencyType;
            });

            this.$nextTick(() => {
                const getTotalNumber = (prevValue, currentVal) => {
                    return { price: prevValue.price + currentVal.price }
                };
                const totalPrice = this.products.reduce(getTotalNumber);
                this.sendTotalAmount(totalPrice);
            });
        },
        methods: {
            priceSign(itemprice) {
                return `${ this.currencySymbol } ${ itemprice }`
            },
            sendTotalAmount(totalPrice) {
                Eventbus.$emit('CALC_TOTAL', totalPrice.price);
            }
        }
    }
</script>
