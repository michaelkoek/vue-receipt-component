<template>

    <div class="invoice-component__summary">
        <ul class="invoice-component__list">

            <li class="qwadd-invoice--subtotal invoice-component__item">
                <p class="invoice-component__item-name">Sub total:</p>
                <p class="invoice-component__item-price">&euro; {{ calculatedTotal }}</p>
            </li>

            <li class="invoice-component--vat invoice-component__item" v-if="summary.vatpercentage">
                <p class="invoice-component__item-name">VAT({{ summary.vatpercentage }}%):</p>
                <p class="invoice-component__item-price">&euro;{{ calculateVat }}</p>
            </li>

            <li class="invoice-component--discount invoice-component__item" v-if="summary.discount">
                <p class="invoice-component__item-name">Discount ({{ summary.discount }}%):</p>
                <p class="invoice-component__item-price">- &euro;{{ calcDiscount }}</p>
            </li>

            <li class="invoice-component--total invoice-component__item">
                <p class="invoice-component__item-name">Total:</p>
                <p class="invoice-component__item-price">{{ summary.total || calcTotal }}</p>
            </li>
        </ul>
    </div>
</template>

<script>

    import Eventbus from '../event-bus';

    export default {
        data() {
            return {
                calculatedTotal: null
            }
        },
        props: {
            summary: {
                type: Object
            }
        },
        computed: {
            calculateVat() {
                if (this.summary.vatprice) return this.summary.vatprice;

                let calc = this.calculatedTotal / 100 * this.summary.vatpercentage;
                calc = parseFloat(Math.round(calc * 100) / 100).toFixed(2);
                return +calc;
            },

            calcDiscount() {
                if (this.summary.discountprice) return this.summary.discountprice;

                let calc = this.calculatedTotal / 100 * this.summary.discount;
                calc = parseFloat(Math.round(calc * 100) / 100).toFixed(2);
                return +calc;
            },

            calcTotal() {
                const resultTotal = +((
                    this.calculatedTotal * 100 +
                    this.calculateVat * 100 -
                    this.calcDiscount * 100
                ) / 100).toFixed(2);

                return resultTotal.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
            }
        },
        methods: {
            getSubTotal(payLoad = 0) {
                if (this.summary.subtotal) {
                    this.calculatedTotal = this.summary.subtotal;
                }
                this.calculatedTotal = payLoad;
            }
        },
        mounted() {
            Eventbus.$on('CURRENCY', (currencyType) => console.log('sum',currencyType));
            Eventbus.$on('CALC_TOTAL', (payLoad) => this.getSubTotal(payLoad));
        }
    }
</script>
