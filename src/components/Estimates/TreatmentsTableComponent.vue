<template>
    <div class="treatments-container">
        <h3>Tratamientos existentes</h3>
        <table>
            <thead>
                <th>Tratamiento</th>
                <th>Descripcion</th>
                <th>Precio MX</th>
                <th>Precio USD</th>
                <th>Tarifa MX</th>
                <th>Tarifa USD</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                <TreatmentsTableRowComponent v-for="treatment in treatmentsData" :key="treatment.id" :treatment="treatment" 
                @treatment-deleted="handleTreatmentDeleted" 
                @treatment-modal="handleTreatmentModal"
                @data-treatment-modal="handleDataTreatmentModal"
                />
            </tbody>
        </table>
        <ModalConfirmationComponent v-show="isVisibleModalConfirmation"
        @action-confirmed="handleActionConfirmed"
        @action-cancelled="handleActionCancelled"/>
    </div>
</template>
<script>
    import axios from 'axios';
    import ModalConfirmationComponent from '../Modals/ModalConfirmationComponent.vue';
    import TreatmentsTableRowComponent from './TreatmentsTableRowComponent.vue';

    export default{
        name: 'TreatmentsTableComponent',
        components: {
            TreatmentsTableRowComponent,
            ModalConfirmationComponent
        },
        props: {
            treatments:{
                type: Object,
                required: true
            }
        },
        data(){
            return{
                isVisibleModalConfirmation: false,
                selectedRow: null,
                treatmentsData: {}
            }
        },
        computed: {
            tratamientos(){
                return this.treatments;
            }
        },
        watch: {
            tratamientos: {
                handler(newVal){
                    this.treatmentsData = newVal;
                },
                immediate: true
            }
        },
        methods: {
            handleTreatmentDeleted(id){
                this.isVisibleModalConfirmation = true;
                this.selectedRow = id;
            },
            handleTreatmentModal(){
                this.$emit('treatment-modal');
            },
            handleDataTreatmentModal(data){
                this.$emit('data-treatment-modal', data);
            },
            handleActionConfirmed(){
                let id = this.selectedRow;
                let formData = new FormData();
                formData.append('id', id);

                axios.post('http://localhost/clinica_dental/service/delete', formData)
                     .then(res=>{
                        if(res.data){
                            this.$emit('treatment-deleted');
                            this.isVisibleModalConfirmation = false;
                        }
                     })
                     .catch(error=>{
                        console.log(error);
                     })
            },
            handleActionCancelled(){
                this.isVisibleModalConfirmation = false;
                this.selectedRow = null;
            }
        }
    }
</script>
<style scoped>

    .treatments-container {
        padding: 1rem 1rem;
        background-color: #555;
        height: 100%;
        box-sizing: border-box;
    }

    h3 {
        margin: 0;
        margin-bottom: 1rem;
        color: var(--basic);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        z-index: 90;
        box-shadow: 3px 3px 3px #444;
    }

    th {
        background-color: var(--deep);
        color: var(--basic);
        padding: .5rem;
        border: 1px solid #444;
    }

    table tbody tr:hover{
        background-color: #000;
        cursor: pointer;
        color: var(--basic);
    }

    tbody tr:nth-child(odd){
        background-color: var(--light);

    }

    tbody tr:nth-child(even){
        background-color: var(--deep);
        color: var(--basic);
    }
</style>

