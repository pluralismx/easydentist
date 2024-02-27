<template>
    <div class="estimates-container">
        <div class="estimates-header">
            <h1>Presupuestos</h1>
        </div>
        <div class="estimates-menu">
            <h2>Menú</h2>
            <ul>
                <li @click="toggleCreateEstimate" ><img class="icon" src="../../assets/icons/file-invoice-dollar.png">Hacer presupuesto</li>
                <li @click="toggleTreatments"><img class="icon" src="../../assets/icons/overview.png">Tratamientos</li>
                <li @click="toggleNewTreatment" ><img class="icon" src="../../assets/icons/pen-field.png">Crear tratamiento</li>
                <li><img class="icon" src="../../assets/icons/customize.png">Informacion del presupuesto</li>
                <li><img class="icon" src="../../assets/icons/folder-open.png">Archivo</li>
            </ul>
        </div>
        <div class="estimates-body">
            <NewTreatmentComponent v-show="isVisibleNewTreatment" @treatment-created="handleTreatmentCreated"/>
            <CreateEstimateComponent :treatments="treatments" v-show="isVisibleCreateEstimate"/>
            <TreatmentsTableComponent :treatments="treatments" v-show="isVisibleTreatments" 
            @treatment-deleted="handleTreatmentDeleted"
            @treatment-modal="handleTreatmentModal"
            @data-treatment-modal="handleDataTreatmentModal"
            />
        </div>
    </div>
</template>
<script>

    import NewTreatmentComponent from './NewTreatmentComponent.vue';
    import CreateEstimateComponent from './CreateEstimateComponent.vue';
    import TreatmentsTableComponent from './TreatmentsTableComponent.vue';

    export default{
        name: 'EstimatesComponent',
        components: { 
            NewTreatmentComponent, 
            CreateEstimateComponent, 
            TreatmentsTableComponent 
        },
        props: {
            treatments: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                isVisibleNewTreatment: false,
                isVisibleCreateEstimate: false,
                isVisibleTreatments: false
            }
        },
        methods: {
            toggleNewTreatment(){
                if(this.isVisibleNewTreatment == false){
                    this.isVisibleNewTreatment = true;
                    // Ocultar otros componentes
                    this.isVisibleCreateEstimate = false;
                    this.isVisibleTreatments = false;

                }else {
                    this.isVisibleNewTreatment = true;
                }
            },
            toggleCreateEstimate(){
                if(this.isVisibleCreateEstimate == false){
                    this.isVisibleCreateEstimate = true;
                    // Ocultar otros componentes
                    this.isVisibleNewTreatment = false;
                    this.isVisibleTreatments = false;

                }else {
                    this.isVisibleCreateEstimate = true;
                }
            },
            toggleTreatments(){
                if(this.isVisibleTreatments == false){
                    this.isVisibleTreatments = true;
                    // Ocultar otros componentes
                    this.isVisibleNewTreatment = false;
                    this.isVisibleCreateEstimate = false;

                }else {
                    this.isVisibleTreatments = true;
                }
            },
            handleTreatmentCreated(){
                this.$emit('treatment-created');
            },
            handleTreatmentDeleted(){
                this.$emit('treatment-deleted');
            },
            handleTreatmentModal(){
                this.$emit('treatment-modal');
            },
            handleDataTreatmentModal(data){
                this.$emit('data-treatment-modal', data);
            }
        }
    }   
</script>
<style scoped>
    .estimates-container{
        height: 100%;
        width: 100%;
        grid-row: 1/2;
        grid-column: 1/2;

        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: 10% 90%;
        border-left: 1px solid black;
        border-right: 1px solid black;
        background-color: #555;
    }

    .estimates-header{
        grid-column: 1/3;
        grid-row: 1/2;
        background-color: #333;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        z-index: 90;
        box-shadow: 0px 3px 4px #111;
    }

    .estimates-header h1{
        margin: 0;
        align-self: center;
        color: var(--accent);
    }

    .estimates-menu{
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: #333;
        padding: 0 1rem;
        color: var(--basic);
        border-right: 1px solid black;
    }

    .icon {
        width: 28px;
        margin-right: 1rem;
    }

    .estimates-menu ul{
        padding: 0;
        list-style: none;
    }

    .estimates-menu ul li{
        padding: 0;
        margin-bottom: 1rem;
        list-style: none;
        display: flex;
        align-items: center;
    }

    .estimates-menu ul li:hover{
        cursor: pointer;
        color: var(--accent);
    }

    .estimates-body{
        grid-column: 2/3;
        grid-row: 2/3;
        background-color: var(--basic);
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
    }
</style>