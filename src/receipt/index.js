import Receipt from './components/Receipt.vue'
import ReceiptItem from './components/ReceiptItem.vue';
import ReceiptSummary from './components/ReceiptSummary.vue'


export default {
    install (Vue) {
        Vue.component('receipt', Receipt);
        Vue.component('receipt-items', ReceiptItem);
        Vue.component('receipt-summary', ReceiptSummary);
    }
}

export { Receipt, ReceiptItem, ReceiptSummary }
