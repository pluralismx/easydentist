<template>
    <tr>
        <td style="text-align: center;">{{ qty }}</td>
        <td>{{ name }}</td>
        <td>{{ description }}</td>
        <td style="text-align: right;">${{ price }}</td>
        <td>{{  }}</td>
        <td style="text-align: right;">${{ total }}</td>
    </tr>
</template>
<script>
    export default {
        name: 'InvoicePreviewComponent',
        props: {
            item: {
                type: Object,
                required: true
            },
            currency: {
                type: String,
                required: false
            }
        },
        data(){
            return {
                selected_currency: null,
                itemObject: {},
                qty: null,
                name: null,
                description: null,
                price: null,
                total: null
            }
        },
        computed: {
            itemData(){
                return this.item;
            },
            moneda(){
                return this.currency;
            },
        },
        watch: {
            moneda: {
                handler(newVal){
                    this.selected_currency = newVal;
                    this.calculteTotal();
                },
                immediate: true
            },
            itemData: {
                handler(newVal){
                    this.itemObject = newVal;
                    this.qty = newVal.qty;
                    this.name = newVal.name;
                    this.description = newVal.description;
                    this.calculteTotal();
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            calculteTotal(){
                switch(this.selected_currency){
                    case 'mx':
                        this.price = this.itemObject.price_mx;
                        this.total = this.itemObject.price_mx * this.itemObject.qty;
                        break;
                    case 'usd':
                        this.price = this.itemObject.price_usd;
                        this.total = this.itemObject.price_usd * this.itemObject.qty;
                        break;
                    default:
                        this.total = null;
                        break;
                }
            }
        }
    }
</script>
<style scoped>
    td {
        border-right: 1px solid black;
        padding: 4px 8px;
    }
</style>