<template>
    <div @click="removeFromInvoice()" class="treatment-card-container">
        <div id="numberCircle" :class="{ 'glowing': glow }" class="item-qty-chip">
            <span >{{ qty }}</span>
        </div>
        <p>{{ name }} - ${{ price }}&nbsp;c/u</p>
        <p>-</p>
    </div>
</template>
<script>
    export default {
        name: 'InvoiceItemCardComponent',
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
        data() {
            return {
                id: null,
                name: null,
                price_mx: null,
                price_usd: null,
                description: null,
                selected_currency: null,
                fees_mx: null,
                fees_usd: null,
                qty: null,
                glow: false
            }
        },
        computed: {
            tratamiento(){
                return this.item;
            },
            moneda(){
                return this.currency;
            },
            price(){
                switch(this.selected_currency){
                    case 'mx':
                        return  parseInt(this.price_mx) + parseInt(this.fees_mx);
                    case 'usd':
                        return parseInt(this.price_usd) + parseInt(this.fees_usd);
                    default:
                        return 0; 
                }
            }
        },
        watch: {
            tratamiento: {
                handler(newVal){
                    this.id = newVal.id;
                    this.name = newVal.name;
                    this.price_mx = newVal.price_mx;
                    this.price_usd = newVal.price_usd;
                    this.description = newVal.description;
                    this.fees_mx = newVal.fees_mx;
                    this.fees_usd = newVal.fees_usd;
                    this.qty = newVal.qty;
                    this.textGlow();
                },
                deep: true,
                immediate: true
            },
            moneda: {
                handler(newVal){
                    this.selected_currency = newVal;
                },
                immediate: true
            }
        },
        methods: {
            removeFromInvoice(){
                let id = this.id;
                this.$emit('treatment-removed', id);
            },
            textGlow(){
                
                if(this.qty > 1){
                    this.glow=true;
                    setTimeout(()=>{
                        this.glow=false;
                    }, 107);
                }

            }
        }
    }
</script>
<style scoped>
    .treatment-card-container{
        background-color: var(--deep);
        box-shadow: 3px 3px 4px #222;
        padding: 4px 12px;
        margin-bottom: .5rem;
        border-radius: 1rem;
        display: flex;
        justify-content: space-between;
        color: var(--basic);
        align-items: center;
    }

    .item-qty-chip{
        border-radius: 50%;
        background-color: var(--accent);
        width: 2rem;
        text-align: center;
        height: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-self: center;
        transform: translateX(-5px);
        
    }


    .item-qty-chip span {
        margin-top: 2px;
        font-size: 18px;
        color: #444;
        transform: translateX(-3px);
        transform: translateY(3px);
    }

    .treatment-card-container:hover{
        background-color: #444;
        cursor: pointer;
    }

    .treatment-card-container p{
        margin: 0;
    }

    .glowing {
        background-color: var(--basic);
    }


</style>