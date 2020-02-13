import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login';
import Dashboard from '../views/Dashboard';
import VistaHistorica from '../views/VistaHistorica';
import VistaActual from '../views/VistaActual';
import Nodos from '../views/Nodos';
import Procesos from '../views/Procesos';
import Registros from '../views/Registros';
import Monitores from '../views/Monitores';
import Callbacks from '../views/Callbacks';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/historical-view',
        name: 'Vista Historica',
        component: VistaHistorica
    },
    {
        path: '/current-view',
        name: 'Vista Actual',
        component: VistaActual
    },
    {
        path: '/nodos',
        name: 'Nodos',
        component: Nodos
    },
    {
        path: '/procesos',
        name: 'Procesos',
        component: Procesos
    },
    {
        path: '/registros',
        name: 'Registros',
        component: Registros
    },
    {
        path: '/monitores',
        name: 'Monitores',
        component: Monitores
    },
    {
        path: '/callbacks',
        name: 'Callbacks',
        component: Callbacks
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
