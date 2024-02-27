<template>
    <nav>
        <ul>
            <li><router-link to="/historias">Historias</router-link></li>
            <li><router-link to="/presupuestos">Presupuestos</router-link></li>
            <li><router-link to="/citas">Citas</router-link></li>
            <li>Bitácoras</li>
            <li>Personal</li>
            <li>Salir</li>
        </ul>
    </nav>
</template>
<script>
    export default{
        name: 'NavigationBarComponent'
    }
</script>
<style scoped>
    nav {
        grid-column: 1/2;
        grid-row: 1/2;
        background-color: #333;
        display: flex;
        align-items: center;
        z-index: 95;
        box-shadow: 3px 3px 4px #111;
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        list-style: none;
        padding: 0;
        margin: 0;
        align-items: center;
    }

    ul li {
        color: var(--basic);
    }

    ul li:hover {
        cursor: pointer;
        color: var(--accent);
    }
</style>