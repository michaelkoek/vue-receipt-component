import { Receipts, ReceiptItems, ReceiptSummary } from './index';

module.exports = {
    install (Vue) {
        Vue.component('receipts', Receipts);
        Vue.component('receipt-items', ReceiptItems);
        Vue.component('receipt-summary', ReceiptSummary);
    }
};
