<template>
    <ul class="invoice-component__list invoice-component__products">
        <li class="invoice-component__item" v-for="(item, index) in products">
            {{ item.name }} - {{ priceSign(item.price) }}
        </li>
    </ul>
</template>

<script>

    import Eventbus from '../event-bus';
    import currencyTypes from '../currencytypes';

    export default {
        data() {
            return {
                currencyType: ''
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
                if (!currencyTypes.currencySymbols[this.currencyType]) {
                    return this.currencyType;
                } else {
                    return currencyTypes.currencySymbols[this.currencyType];
                }
            }
        },
        mounted() {
            Eventbus.$on('CURRENCY', (currencyType) => {
                this.currencyType = currencyType;
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
