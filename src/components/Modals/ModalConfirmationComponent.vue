<template>
    <div class="modal-screen">
        <div class="modal-container">
            <p>¿Está seguro que desea eliminar el tratamiento?</p>
            <div class="options">
                <button class="btn-accent" @click="actionConfirmed">Sí</button>
                <button class="btn-basic" @click="actionCancelled">Cancelar</button>
            </div>

        </div>
    </div>
</template>
<script>
    export default{
        name: 'ModalConfirmationComponent',
        methods: {
            actionConfirmed(){
                this.$emit('action-confirmed');
            },
            actionCancelled(){
                this.$emit('action-cancelled');
            }
        }
    }
</script>
<style scoped>
    .modal-container {
        /* height: 10%; */
        width: 15%;
        background-color: var(--light);
        padding: 1rem;
        box-shadow: 3px 3px 3px #111;
        border-radius: 4px;
    }

    .options {
        display: flex;
        justify-content: space-evenly;
    }

    .options button{
        width: 80px;
    }
</style>