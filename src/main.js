import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import WelcomeComponent from './components/WelcomeComponent';
import HistoryComponent from './components/History/HistoryComponent';
import EstimatesComponent from './components/Estimates/EstimatesComponent';
import AppointmentsComponent from './components/Appointments/AppointmentsComponent';
import './assets/global.css';


const routes = [
    { path: '/', component: WelcomeComponent },
    { path: '/historias', component: HistoryComponent },
    { 
        path: '/presupuestos', 
        component: EstimatesComponent,
        props: true
    },
    { path: '/citas', component: AppointmentsComponent},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app');