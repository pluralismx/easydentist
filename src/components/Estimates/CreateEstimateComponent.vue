<template>
    <div class="create-estimate-container">
        <div class="title">
            <h3>Crear presupuesto</h3>
        </div>
        
        <!-- Settings -->
        <div class="estimate-settings-container">
            <!-- Settings header -->
            <div class="estimate-settings-header">
                <p>Paciente</p>
            </div>
            <!-- Settings body -->
            <div class="estimate-settings-body">
                <div class="search-bar">
                    <div class="search-block">
                        <input type="text" placeholder="Buscar por nombre" v-model="searchByName">
                    </div>

                    <div class="search-block">
                        <input type="text" placeholder="Buscar por celular">
                    </div>

                    <div class="search-block">
                        <input type="email" placeholder="buscar@poremail.com" v-model="searchByEmail">
                    </div>

                    <div class="settings-block">
                        <button class="btn-deep" @click="searchPatient()">buscar</button>
                    </div>
                </div>
                <div class="search-results">
                    <div v-for="patient in searchResults" :key="patient.id" class="search-results-row">
                        {{ patient.name }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Left side -->
        <div class="available-treatments-container">
            <!-- Header -->
            <div class="available-treatments-header">
                <p>Elija los servicios para el presupuesto</p>
            </div>
            <!-- Body -->
            <div class="available-treatments-body">
                <div class="available-treatments-list">
                    <TreatmentCardComponent v-for="treatment in treatmentsData" :key="treatment.id" :treatment="treatment"
                    @treatment-added="handleTreatmentAdded"/>
                </div>

            </div>
        </div>

        <!-- Right side -->
        <div class="estimate-treatments-container">
            <!-- Header -->
            <div class="estimate-treatments-header">
                <p>Tratamientos añadidos</p>
                <select v-model="currency">
                    <option value="mx">pesos</option>
                    <option value="usd">dólares</option>
                </select>
            </div>
            <!-- Body -->
            <div class="estimate-treatments-body">
                <div class="items-list-container">
                    <InvoiceItemCardComponent v-for="item in invoiceData" :key="item.id" :item="item" :currency="currency"
                    @treatment-removed="handleTreatmentRemoved"/>
                </div>
            </div>
            <!-- Footer -->
            <div class="items-list-controls">
                <button class="btn-deep" @click="togglePreview()">Vista previa</button>
            </div>
        </div>
        <InvoicePreviewComponent v-show="isVisiblePreview" @preview-closed="handleClosePreview" :invoiceData="invoiceData" :currency="currency"/>
    </div>
</template>
<script>
    import axios from 'axios';
    import InvoiceItemCardComponent from './InvoiceItemCardComponent.vue';
    import TreatmentCardComponent from './TreatmentCardComponent.vue';
    import InvoicePreviewComponent from './InvoicePreviewComponent.vue';

    export default{
        name: 'CreateEstimateComponent',
        components: {
            TreatmentCardComponent,
            InvoiceItemCardComponent,
            InvoicePreviewComponent
        },
        props: {
            treatments: {
                type: Object,
                required: true
            },
            
        },
        data(){
            return {
                searchResults: null,
                treatmentsData: [],
                invoiceData: [],
                currency: 'mx',
                isVisiblePreview: false,
                searchByName: null,
                searchByPhone: null,
                searchByEmail: 'gerardo.topete@outlook.com'
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
            handleTreatmentAdded(data){
                if(this.invoiceData.length > 0){
                    let id = data.id;
                    let count = 0;
                    this.invoiceData.forEach(item =>{
                        if(item.id == id ){
                            item.qty++;
                            count++;
                        }
                    });

                    if(count == 0){
                        this.invoiceData.push(data);
                    }

                }else{
                    this.invoiceData.push(data);
                }
                console.log(this.invoiceData);
            },
            handleTreatmentRemoved(id) {

                this.invoiceData.forEach((item, index)=>{
                    if(item.id == id){
                        if(item.qty > 0){
                            item.qty--;
                            if(item.qty == 0){
                                this.invoiceData.splice(index, 1);
                            }
                        }
                    }
                });

            },
            handleClosePreview(){
                this.togglePreview();
            },
            togglePreview(){
                if(this.isVisiblePreview == false){
                    this.isVisiblePreview=true;
                }else{
                    this.isVisiblePreview=false;
                }
            },
            searchPatient(){
                let email = this.searchByEmail;
                let formData = new FormData();
                formData.append('email', email);

                axios.post("http://localhost/clinica_dental/patient/records", formData)
                     .then(res=>{
                        if(res.data.status == 'succes'){
                            this.searchResults = res.data.records;
                        }else{
                            this.searchResults = 'no se encontraron resultados';
                        }
                     }).catch(error=>{
                        console.log(error);
                     });

            }
        }
    }
</script>
<style scoped>

    /* Main container */
    .create-estimate-container {
        height: 100%;
        width: 100%;
        grid-row: 1/2;
        grid-column: 1/2;

        display: grid;
        grid-template-columns: calc(50% - 0.5rem) calc(50% - 0.5rem);
        grid-template-rows: calc(4% - 0.5rem) calc(20% - 0.5rem) calc(76% - 0.5rem);
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;

        padding: 1rem 1rem;
        margin-bottom: 1rem;

        background-color: #555;
        box-sizing: border-box;
        overflow-y: scroll;
        
    }

    .title {
        margin: 0;
        padding: 0;
        grid-column: 1/3;
        grid-row: 1/2;
        box-sizing: border-box;
        color: var(--basic);
    }

    /* Header */

    .estimate-settings-container {
        grid-row: 2/3;
        grid-column: 1/3;
        background-color: var(--light);
        z-index: 85;
        box-shadow: 3px 3px 3px #444;
        border-radius: 4px;
        box-sizing: border-box;

    }

    .estimate-settings-header {
        background-color: var(--deep);
        padding: 0.5rem;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
    }

    .search-bar {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1rem;
        align-items: center;
    }

    .search-bar input{
        width: 100%;
    }

    .search-bar .search-block {
        width: 20%;
        margin-right: 2rem;
    }

    .settings-block button {
        padding-top: calc(0.5rem + 2px);
        padding-bottom: calc(0.5rem + 2px);
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

    .estimate-settings-header p {
        color: var(--basic);
        margin: 0;
    }

    .estimate-settings-body {
        padding: 1rem;
    }

    .create-estimate-container h3 {
        margin:0;
        margin-bottom: .5rem;
        box-sizing: border-box;
    }

    /* Lado izquierdo */

    .available-treatments-container {
        
        grid-column: 1/2;
        grid-row: 3/4;
        z-index: 85;

        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 8% 92%;


        box-shadow: 3px 3px 3px #444;
        background-color: var(--light);
        box-sizing: border-box;
        border-radius: 4px;
    }

    .available-treatments-header {
        
        grid-column: 1/2;
        grid-row: 1/2;

        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        padding: 0 .5rem;

        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        background-color: var(--deep);
        
    }

    .available-treatments-header p {
        margin: 0;
        padding: 0;
        color: var(--basic);
    }

    select {
        width: 80px;
        padding: 4px;
        border-radius: 4px;
        background-color: var(--accent);
        color: #444;
        cursor: pointer;
    }

    select:focus{
        outline: none;
        
    }
    .available-treatments-body {
        grid-column: 1/2;
        grid-row: 2/3;
        padding: 1rem;
        background-color: var(--light);
        box-sizing: border-box;
        border-radius: 4px;
    }

    .available-treatments-list {
        background-color: #888;
        height: 100%;
        padding: .5rem;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #777;
    }

    /* Lado derecho */

    .estimate-treatments-container {
        background-color: var(--light);
        grid-column: 2/3;
        grid-row: 3/4;
        width: 100%;
        height: 100%;
        z-index: 85;
        box-shadow: 3px 3px 3px #444;
        border-radius: 4px;

        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 8% 83% 9%;
    }

    .estimate-treatments-header {
        grid-row: 1/2;
        grid-column: 1/2;
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--deep);
        border-top-right-radius: 4px; 
        border-top-left-radius: 4px;   
    }

    .estimate-treatments-header p {
        margin: 0;
        padding: 0;
        color: var(--basic);
    }

    .estimate-treatments-body {
        padding: 1rem;
        padding-bottom: 0;
        grid-row: 2/3;
        grid-column: 1/2;
        height: 100%;
        box-sizing: border-box;
    }

    .items-list-container{
        background-color: #888;
        height: 100%;
        padding: .5rem;
        padding-bottom: 0;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #777;
    }

    .items-list-controls {
        grid-column: 1/2;
        grid-row: 3/4;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
















    /* Estilos para la barra de desplazamiento */
    ::-webkit-scrollbar {
    width: 0px; /* Ancho de la barra de desplazamiento */
    }

    /* Estilo del riel de la barra de desplazamiento */
    ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color del riel */
    }

    /* Estilo del pulgar de la barra de desplazamiento */
    ::-webkit-scrollbar-thumb {
    background-color: #888; /* Color del pulgar */
    border-radius: 5px; /* Radio de borde del pulgar */
    }

    /* Cambiar el color del pulgar al pasar el mouse */
    ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Nuevo color del pulgar */
    }


</style>