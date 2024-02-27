<template>
    <div @click="addToInvoice" class="treatment-card-container">
        <p>{{ name }}</p>
        <p>+</p>
    </div>
</template>
<script>
    export default {
        name: 'TreatmentCardComponent',
        props: {
            treatment: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                id: null,
                name: null,
                price_mx: null,
                price_usd: null,
                description: null,
                fees_mx: null,
                fees_usd: null
            }
        },
        computed: {
            tratamiento(){
                return this.treatment;
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
                },
                immediate: true
            }
        },
        methods: {
            addToInvoice(){
                const data = {
                    id: this.id,
                    qty: 1,
                    name: this.name,
                    description: this.description,
                    price_mx: this.price_mx,
                    price_usd: this.price_usd,
                    fees_mx: this.fees_mx,
                    fees_usd: this.fees_usd
                }
                this.$emit('treatment-added', data);
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
        font-size: 1rem;
    }

    .treatment-card-container:hover{
        background-color: var(--accent);
        cursor: pointer;
        color: #222;
    }

    .treatment-card-container p{
        margin: 0;
    }


</style>