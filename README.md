# vue-receipt-component

> A component that shows you the receipt based on JSON data.

## Installation
You can install the package via yarn:
```
yarn add vue-receipt-component
```
or npm:
```
npm install vue-receipt-component --save
```

How to use:
```
<receipts name="Your Receipt" currency="EUR">
    <receipt-items :products="invoiceItem"></receipt-items>
    <receipt-summary slot="summary" :summary="invoiceSummaryData"></receipt-summary>
</receipts>
```

##Usage

The most common use case is to register the component globally.
```
//in your app.js or similar file
import Vue from 'vue';
import { Receipt, ReceiptItem, ReceiptSummary } from 'vue-receipt-component';

Vue.component('receipt', Receipt);
Vue.component('receiptItem', ReceiptItem);
Vue.component('receiptSummary', ReceiptSummary);
```
Alternatively you can do this to register the components:
```
import Receipt from 'vue-receipt-component';

Vue.use(Receipt);
```

