<template>
    <div class="receipt-component__summary">
        <ul class="receipt-component__list">
            <li class="receipt-component--subtotal receipt-component__item">
                <p class="receipt-component__item-name">Sub total:</p>
                <p class="receipt-component__item-price">{{ currencySymbol }} {{ calculatedTotal }}</p>
            </li>

            <li class="receipt-component--vat receipt-component__item" v-if="summary.vatpercentage">
                <p class="receipt-component__item-name">VAT({{ summary.vatpercentage }}%):</p>
                <p class="receipt-component__item-price">{{ currencySymbol }} {{ calculateVat }}</p>
            </li>

            <li class="receipt-component--discount receipt-component__item" v-if="summary.discount">
                <p class="receipt-component__item-name">Discount ({{ summary.discount }}%):</p>
                <p class="receipt-component__item-price">{{ currencySymbol }} {{ calcDiscount }}</p>
            </li>

            <li class="receipt-component--total receipt-component__item">
                <p class="receipt-component__item-name">Total:</p>
                <p class="receipt-component__item-price">{{ currencySymbol }} {{ calcTotal }}</p>
            </li>
        </ul>
    </div>
</template>

<script>

    import Eventbus from '../event-bus';
    import currencyTypes from '../currencytypes';

    export default {
        data() {
            return {
                calculatedTotal: 0,
                currencyType: '',
                currencyCheckSymbol: true
            }
        },
        props: {
            summary: {
                type: Object
            }
        },
        computed: {
            currencySymbol() {
                if (!currencyTypes.currencySymbols[this.currencyType] || this.currencyCheckSymbol === false) {
                    return this.currencyType;
                } else {
                    return currencyTypes.currencySymbols[this.currencyType];
                }
            },
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
                if (this.summary.total) return this.summary.total;
                const resultTotal = +((
                    this.calculatedTotal * 100 +
                    this.calculateVat * 100 -
                    this.calcDiscount * 100
                ) / 100).toFixed(2);

                return resultTotal;
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
            Eventbus.$on('CALC_TOTAL', (payLoad) => this.getSubTotal(payLoad));
            Eventbus.$on('CURRENCY', (currencyConf) => {
                this.currencyType = currencyConf.currencyType;
                this.currencyCheckSymbol = currencyConf.currencySymbol;
            });
        }
    }
</script>
