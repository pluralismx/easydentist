<template>
    <div class="app-template">
        <NavigationBarComponent/>
        <div class="router-wrapper">
            <router-view 
            :treatments="treatments" 
            @treatment-created="handleTreatmentCreated"
            @treatment-deleted="handleTreatmentDeleted"
            @treatment-modal="handleTreatmentModal"
            @data-treatment-modal="handleDataTreatmentModal"/>
        </div>
    </div>
    <ModalEditTreatmentComponent v-show="isVisibleModalTreatments" :treatment="modal_treatment_data" 
    @toggle-modal="handleTreatmentModal"
    @treatment-updated="handleTreatmentUpdated"/>
</template>
<script>
    import axios from 'axios';
    import NavigationBarComponent from './components/NavigationBarComponent.vue';
    import ModalEditTreatmentComponent from './components/Modals/ModalEditTreatmentComponent';
    export default{
        name: 'App',
        components: {
            NavigationBarComponent,
            ModalEditTreatmentComponent
        },
        data(){
            return{
                isVisibleModalTreatments: false,
                treatments: {},
                modal_treatment_data: {}
            }
        },
        created(){
            this.loadTreatments();
        },
        methods: {
            loadTreatments(){
                axios.get('http://localhost/clinica_dental/service/records')
                     .then( res => {
                        if(res.data.status == 'succes'){
                            this.treatments = res.data.records;
                            //console.log(this.treatments);
                        }
                     }).catch( error=> {
                        console.log(error);
                     })
            },
            handleTreatmentCreated(){
                this.loadTreatments();
            },
            handleTreatmentUpdated(){
                this.loadTreatments();
            },
            handleTreatmentDeleted(){
                this.loadTreatments();
            },
            handleTreatmentModal(){
                if(this.isVisibleModalTreatments == false){
                    this.isVisibleModalTreatments=true;
                }else{
                    this.isVisibleModalTreatments=false
                }
            },
            handleDataTreatmentModal(data){
                this.modal_treatment_data = data;
            }
        }
    }
</script>
<style scoped>

    .app-template {
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 100vw;
        grid-template-rows: 8vh 92vh;
    }

    .router-wrapper {
        grid-column: 1/2;
        grid-row: 2/3; 
        margin: 0 10%;
        background-color: var(--basic);
        
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;

        
    }
</style>