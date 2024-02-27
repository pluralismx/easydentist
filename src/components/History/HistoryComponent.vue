<template>
    <div class="history-container">
        <div class="history-header">
            <h1>Historias clínicas</h1>
        </div>
        <div class="history-menu">
            <h1>Menú</h1>
            <ul>
                <li>Hacer presupuesto</li>
                <li>Tratamientos</li>
                <li>Crear tratamiento</li>
            </ul>
        </div>
        <div class="history-body"></div>
    </div>
</template>
<script>
    export default{
        name: 'HistoryComponent'
    }
</script>
<style scoped>
    .history-container{
        height: 100%;
        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: 10% 90%;
    }

    .history-header{
        grid-column: 1/3;
        grid-row: 1/2;
        background-color: aqua;
    }

    .history-menu{
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: green;
    }

    .history-menu ul li:hover{
        cursor: pointer;
        color: var(--basic);
    }

    .history-body{
        grid-column: 2/3;
        grid-row: 2/3;
        background-color: beige;
    }
</style>