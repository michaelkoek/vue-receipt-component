<template>
    <div id="app">


        <receipts name="Your Invoice" v-if="true">
            <receipt-items :products="invoiceItem"></receipt-items>

            <receipt-summary slot="summary" :summary="invoiceSummaryData">
            </receipt-summary>
        </receipts>

    </div>
</template>

<script>
    import { Receipt, ReceiptItem, ReceiptSummary } from './receipt';

    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                invoiceItem: [
                    { name: 'Cheese Product 1', price: 2.50 },
                    { name: 'Cheese Product 2', price: 3.23 },
                    { name: 'Cheese Product 3', price: 4.35 },
                    { name: 'Cheese Product 4', price: 1.99 }
                ],
                invoiceSummaryData: {
                    // subtotal: 25.25,
                    discount: 10,
                    currency: "euro",
                    // discountprice: 10,
                    vatpercentage: 6,
                    // vatprice: 20,
                    // total: 1400
                }
            }
        },
        components: {
            receipts: Receipt,
            receiptItems: ReceiptItem,
            receiptSummary: ReceiptSummary
        }
    }
</script>
