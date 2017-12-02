<template>
    <ul class="receipt-component__list receipt-component__products">
        <li class="receipt-component__item" v-for="(item, index) in products" :key="index">
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
                currencyType: '',
                currencyCheckSymbol: true
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
                if (!currencyTypes.currencySymbols[this.currencyType] || this.currencyCheckSymbol === false) {
                    return this.currencyType;
                } else {
                    return currencyTypes.currencySymbols[this.currencyType];
                }
            }
        },
        mounted() {
            Eventbus.$on('CURRENCY', (currencyConf) => {
                this.currencyType = currencyConf.currencyType;
                this.currencyCheckSymbol = currencyConf.currencySymbol;
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
