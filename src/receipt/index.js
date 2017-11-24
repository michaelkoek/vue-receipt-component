import Receipt from './components/Receipt';
import ReceiptItem from './components/ReceiptItem';
import ReceiptSummary from './components/ReceiptSummary'


export default {
    install (Vue) {
        Vue.component('receipt', Receipt);
        Vue.component('receipt-items', ReceiptItem);
        Vue.component('receipt-summary', ReceiptSummary);
    }
}

export { Receipt, ReceiptItem, ReceiptSummary }
