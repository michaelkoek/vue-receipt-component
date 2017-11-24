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
                firstName: 'Foo',
                lastName: 'Bar'
            }
        },
        props: {
            products: {
                type: Array,
                required: true
            }
        },
        mounted() {
            Eventbus.$on('CURRENCY', (currencyType) => console.log('item', currencyType));

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
                return itemprice.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
            },
            sendTotalAmount(totalPrice) {
                Eventbus.$emit('CALC_TOTAL', totalPrice.price);
            }
        }
    }
</script>
