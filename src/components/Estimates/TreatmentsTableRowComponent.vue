<template>
    <tr>
        <td>{{ this.name }}</td>
        <td>{{ this.description }}</td>
        <td style="text-align: center;">${{ this.price_mx }}</td>
        <td style="text-align: center;">${{ this.price_usd }}</td>
        <td style="text-align: center;">${{ this.fees_mx }}</td>
        <td style="text-align: center;">${{ this.fees_usd }}</td>
        <td style="text-align: center;">
            <button @click="updateTreatment()" style="margin-right: .5rem;" class="btn-basic">editar</button>
            <button @click="deleteTreatment()" class="btn-accent">eliminar</button>
        </td>
    </tr>
</template>
<script>
    //import axios from 'axios';
    export default{
        name: 'TreatmentsTableRowComponent',
        props: {
            treatment: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                id: null,
                name: null,
                description: null,
                price_mx: null,
                price_usd: null,
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
                    this.description = newVal.description;
                    this.price_mx = newVal.price_mx;
                    this.price_usd = newVal.price_usd;
                    this.fees_mx = newVal.fees_mx;
                    this.fees_usd = newVal.fees_usd;
                },
                immediate: true
            }
        },
        methods: {
            deleteTreatment(){
                this.$emit('treatment-deleted', this.id);
            },
            updateTreatment(){
                const data = {
                    id: this.id,
                    name: this.name,
                    description: this.description,
                    price_mx: this.price_mx,
                    price_usd: this.price_usd,
                    fees_mx: this.fees_mx,
                    fees_usd: this.fees_usd
                }
                this.$emit('treatment-modal'); // para el v-show del modal
                this.$emit('data-treatment-modal', data);
            }
        }
    }
</script>
<style scoped>

    td {
        padding: .5rem;
        font-size: 14px;
        border: 1px solid #444;
    }

    button {
        width: 40%; 
    }
</style>