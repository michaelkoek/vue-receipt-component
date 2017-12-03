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
    <receipt-items :products="productItems"></receipt-items>
    <receipt-summary :summary="productSummary"></receipt-summary>
</receipts>
```

## Usage

The most common use case is to register the component globally.
```
//in your app.js or similar file
import Vue from 'vue';
import { Receipt, ReceiptItem, ReceiptSummary } from 'vue-receipt-component';

// Install as a global component...
Vue.component('receipt', Receipt);
Vue.component('receiptItem', ReceiptItem);
Vue.component('receiptSummary', ReceiptSummary);

// or as an local component
components: {
    Receipts,
    ReceiptItems,
    ReceiptSummary
}
```
Alternatively you can do this to register the components:
```
import Receipt from 'vue-receipt-component';

Vue.use(Receipt);
```

### Set your own custom title
Set a custom title by passing the title in the name attribute
```
<receipts name="Your Receipt"></receipts>
```

### Set currency type
You can set the currency this by passing the currency property and the currency name in the three letters caps format.
If you currency type is supported, it will show the currency symbol.
```
<receipts name="Your Receipt" currency="EUR"></receipts>
```

#### Show currency type name
If you **don't** want the currency symbol set the option to false by adding the dynamic
property `:symbol="false"`:
```
<receipts name="Your Receipt" currency="EUR" :symbol="false"></receipts>
```

## Populate the  data

### Product items
The items receives an `array` of objects which should hold the product name and the price
e.g.

The item name should be `name` and the product price is `price`

```
productItems: [
    { name: 'Cheese Product 1', price: 2.50 },
    { name: 'Cheese Product 2', price: 3.23 },
    { name: 'Cheese Product 3', price: 4.35 },
    { name: 'Cheese Product 4', price: 1.99 }
]
```
which you will need to pass as a dynamic property to the receipt item like so:
```
<receipt-items :products="productItems"></receipt-items>
```

### Summary
The summary data should receive an `object` of options which will set the prices.
You could choose if the prices are **calculated dynamically** based the prices of the items
or pass the data through the object options if you want to do the calculation elsewhere like on the backend.

These are all the options:
```
productSummary: {
    subtotal: 25.25,
    discount: 25,
    discountprice: 10,
    vatpercentage: 21,
    vatprice: 20,
    total: 1400
}
```
Which you will need to pass a dynamic property as well.
```
<receipt-summary :summary="productSummary"></receipt-summary>
```

