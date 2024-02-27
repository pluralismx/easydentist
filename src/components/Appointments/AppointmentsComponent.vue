<template>
    <div class="appointments-container">
        <div class="appointments-header">
            <h1>Citas</h1>
        </div>
        <div class="appointments-menu">
            <h1>Menú</h1>
            <ul>
                <li>Hacer presupuesto</li>
                <li>Tratamientos</li>
                <li>Crear tratamiento</li>
            </ul>
        </div>
        <div class="appointments-body"></div>
    </div>
</template>
<script>
    export default{
        name: 'AppointmentsComponent'
    }
</script>
<style scoped>
    .appointments-container{
        height: 100%;
        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: 10% 90%;
    }

    .appointments-header{
        grid-column: 1/3;
        grid-row: 1/2;
        background-color: aqua;
    }

    .appointments-menu{
        grid-column: 1/2;
        grid-row: 2/3;
        background-color: green;
    }

    .appointments-body{
        grid-column: 2/3;
        grid-row: 2/3;
        background-color: beige;
    }
</style>