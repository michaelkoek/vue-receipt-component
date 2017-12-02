import Receipts from './components/Receipt.vue'
import ReceiptItems from './components/ReceiptItem.vue';
import ReceiptSummary from './components/ReceiptSummary.vue'

export default {
    install (Vue) {
        Vue.component('receipts', Receipts);
        Vue.component('receipt-items', ReceiptItems);
        Vue.component('receipt-summary', ReceiptSummary);
    }
}

export { Receipts, ReceiptItems, ReceiptSummary }
