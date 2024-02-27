<template>
    <div class="invoice-preview-container">
        <div class="preview-container">
            <div class="preview-header">
                <span>Vista previa</span>
                <span @click="closePreview()">&times;</span>
            </div>
            <div class="preview-body" id="test">
                <table id="pdf-table">
                    <thead>
                        <tr>
                            <th>Qty</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Unit price</th>
                            <th>TAX</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <InvoicePreviewRowComponent v-for="item in invoiceList" :key="item.id" :item="item" :currency="selected_currency"/>
                    </tbody>
                </table>
            </div>
            <div class="preview-footer">
                <button class="btn-deep" @click="saveInvoice()">Imprimir</button>
            </div>
        </div>
    </div>

</template>
<script>
    import axios from 'axios';
    import InvoicePreviewRowComponent from './InvoicePreviewRowComponent.vue';
    export default {
        name: 'InvoicePreviewComponent',
        components: {
            InvoicePreviewRowComponent,
        },
        props: {
            invoiceData: {
                type: Array,
                required: true
            },
            currency: {
                type: String,
                required: false
            }
        },
        data() {
            return {
                selected_currency: null,
                invoiceList: [],
            }
        },
        computed: {
            invoiceItems(){
                return this.invoiceData;
            },
            moneda(){
                return this.currency;
            },
        },
        watch: {
            invoiceItems: {
                handler(newVal){
                    this.invoiceList = newVal;
                    console.log(this.invoiceList);
                },
                immediate: true,
                deep: true
            },
            moneda: {
                handler(newVal){
                    this.selected_currency = newVal;
                },
                immediate: true
            }
        },
        methods: {
            closePreview(){
                this.$emit('preview-closed');
            },
            saveInvoice(){
                let name = "Perengano De Tal";
                let formData = new FormData();
                formData.append('name', name);
                axios.post('http://localhost/clinica_dental/estimate/create', formData)
                     .then(res=>{
                        if(res.data.status == 'succes'){
                            this.addToInvoice(res.data.id);
                        }
                     }).catch(error=>{
                        console.log(error);
                     });

            },
            addToInvoice(id){
                console.log('ejecutando addToInvoice');
                const data = {
                    id: id,
                    items: this.invoiceList
                }

                axios.post('http://localhost/clinica_dental/estimate/addToInvoice', data, { withCredentials: true })
                     .then(res=>{
                        console.log(res);
                     })
                     .catch(error => {
                        console.error('Error:', error);
                     });
            }

        }
    }
</script>
<style scoped>

    .invoice-preview-container {
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(10, 10, 10, .8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .preview-container{
        background-color: var(--light);
        width: 35%;
        box-shadow: 3px 3px 8px #111;
        border-radius: 4px;
    }

    .preview-header {
        padding: .5rem;
        background-color: var(--deep);
        color: var(--basic);
        display: flex;
        justify-content: space-between;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
    }

    span:hover {
        color: var(--accent);
        cursor: pointer;
    }

    .preview-body {
        padding: 1rem;
    }

    .preview-body table {
        border-collapse: collapse;
        width: 100%;
    }

    table, th, td {
        border: 1px solid black;
        padding: 6px;
    }
    
    .preview-footer{
        padding: 1rem;
        display: flex;
        justify-content: center;
    }


</style>
