<template>
    <div class="new-treatments-container">
        <h3>Crear nuevo tratamiento</h3>
        <div class="form-container">
            
            <div class="field-block">
                <label>Name:</label>
                <input type="text" v-model="this.name">
            </div>

            <div class="field-block">
                <label>Descripción:</label>
                <input type="text" v-model="this.description">
            </div>

            <div class="field-block">
                <label>Precio MX:</label>
                <input type="text" v-model="this.price_mx">
            </div>

            <div class="field-block">
                <label>Precio USD:</label>
                <input type="text" v-model="this.price_usd">
            </div>

            <div class="field-block">
                <label>Tarifa MX:</label>
                <input type="text" v-model="this.fees_mx">
            </div>

            <div class="field-block">
                <label>Tarifa USD:</label>
                <input type="text" v-model="this.fees_usd">
            </div>

            <div class="button-block">
                <button @click="createTreatment()" type="button" class="btn-deep">guardar</button>
            </div>
        </div>
        
    </div>
    
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'NewTreatmentComponent',
        data(){
            return{
                name: null,
                description: null,
                price_mx: null,
                price_usd: null,
                fees_mx: null,
                fees_usd: null
            }
        },
        methods: {
            createTreatment(){
                let name = this.name;
                let description = this.description;
                let price_mx = this.price_mx;
                let price_usd = this.price_usd;
                let fees_mx = this.fees_mx;
                let fees_usd = this.fees_usd;

                let formData = new FormData();

                formData.append('name', name);
                formData.append('description', description);
                formData.append('price_mx', price_mx);
                formData.append('price_usd', price_usd);
                formData.append('fees_mx', fees_mx);
                formData.append('fees_usd', fees_usd);

                axios.post('http://localhost/clinica_dental/service/create', formData)
                     .then(res=>{
                        if(res.data){
                            this.name = null,
                            this.description = null,
                            this.price_mx = null,
                            this.price_usd = null,
                            this.fees_mx = null,
                            this.fees_usd = null
                            this.$emit('treatment-created');
                        } 
                     }).catch(error=>{
                        console.log(error);
                     });

            }
        }
    }
</script>
<style scoped>
    .new-treatments-container{
        padding: 0 1rem;
        background-color: #555;
        height: 100%;
        color: var(--basic);
    }

    .form-container{
        display: flex;
        flex-direction: column;
        width: 50%;
        background-color: var(--light);
        padding: 1rem;
        border-radius: 4px;
        box-shadow: 3px 3px 3px #444;
    }

    .field-block {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
    }

    .form-container button{
        width: 20%;
    }

    .button-block {
        display: flex;
        justify-content: center;
    }

    label {
        margin-bottom: 4px;
        color: #444;
    }

</style>