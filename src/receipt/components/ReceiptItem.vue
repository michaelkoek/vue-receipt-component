<template>
    <div>
        <li class="qwadd-invoice__item" v-for="(item, index) in products">
            {{ item.name }} - {{ priceSign }}
        </li>

    </div>
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
        computed: {
            priceSign: {
                get: function () {
                    return this.firstName + ' ' + this.lastName
                },
                // setter
                set: function (newValue) {

                    console.log(newValue);

                    const names = newValue.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[names.length - 1]
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                const getTotalNumber = (prevValue, currentVal) => {
                    return { price: prevValue.price + currentVal.price }
                };
                const totalPrice = this.products.reduce(getTotalNumber);

                this.sendTotalAmount(totalPrice);
            });
        },
        methods: {
            sendTotalAmount(totalPrice) {
                Eventbus.$emit('CALC_TOTAL', totalPrice.price);
            }
        }
    }
</script>
