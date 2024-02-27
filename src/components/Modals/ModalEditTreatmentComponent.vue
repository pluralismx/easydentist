<template>
    <div class="modal-screen">
        <div class="modal-container">
            <div class="modal-header">
                <p>Editar tratamiento</p>
                <p class="close-modal" @click="closeModal()">&times;</p>
            </div>
            <div class="modal-body">
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

                    <div class="field-block" style="margin-bottom: 0;">
                        <label>Tarifas Mx:</label>
                        <input type="text" v-model="this.fees_mx">
                    </div>

                    <div class="field-block" style="margin-bottom: 0;">
                        <label>Tarifas USD:</label>
                        <input type="text" v-model="this.fees_usd">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button @click="updateTreatment" class="btn-deep">guardar</button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'ModalEditTreatmentComponent',
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
                description: null,
                price_mx: null,
                price_usd: null,
                fees_mx: null,
                fees_usd: null
            };
        },
        computed: {
            tratamiento() {
                return this.treatment;
            }
        },
        watch: {
            tratamiento: {
                handler(newVal) {
                    // Asigna los valores de newVal a las propiedades del bloque data
                    this.id = newVal.id;
                    this.name = newVal.name;
                    this.description = newVal.description;
                    this.price_mx = newVal.price_mx;
                    this.price_usd = newVal.price_usd;
                    this.fees_mx = newVal.fees_mx;
                    this.fees_usd = newVal.fees_usd;
                },
                immediate: true // Para ejecutar el watcher inmediatamente después de la creación del componente
            }
        },
        methods: {
            closeModal(){
                this.$emit('toggle-modal');
            },
            updateTreatment(){
                let id = this.id;
                let name = this.name;
                let description = this.description;
                let price_mx = this.price_mx;
                let price_usd = this.price_usd;
                let fees_mx = this.fees_mx;
                let fees_usd = this.fees_usd;

                let formData = new FormData();

                formData.append('id', id);
                formData.append('name', name);
                formData.append('description', description);
                formData.append('price_mx', price_mx);
                formData.append('price_usd', price_usd);
                formData.append('fees_mx', fees_mx);
                formData.append('fees_usd', fees_usd);

                axios.post("http://localhost/clinica_dental/service/update", formData)
                     .then(res=>{
                        if(res.data){
                            this.$emit('treatment-updated');
                            this.closeModal();
                        }
                     })
                     .catch(error=>{
                        console.log(error);
                     })
            }
        }
    }
</script>
<style scoped>
    .modal-container{
        background-color: var(--light);
        width: 20%;
        border-radius: 4px;
        box-shadow: 3px 3px 8px #111;
    }

    .modal-header {
        background-color: var(--deep);
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        color: var(--basic);
    }

    .modal-header p {
        margin: 0;
        padding: 0;
    }

    .close-modal:hover{
        cursor: pointer;
        color: var(--accent);
    }

    .modal-body {
        padding: .5rem;
    }

    .form-container{
        display: flex;
        flex-direction: column;
    }

    .field-block {
        margin-bottom: .5rem;
        display: flex;
        flex-direction: column;
    }

    .modal-footer{
        display: flex;
        justify-content: center;
        padding: .5rem;
    }
</style>