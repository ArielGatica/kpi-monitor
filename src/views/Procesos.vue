<template>
    <v-container fluid grid-list-md text-xs-left>
        <v-layout row wrap align-center justify-center>
            <v-flex xs9 mt-11>
                <v-card>
                    <v-toolbar color="#005BFF" dark>
                        <v-toolbar-title class="headline">
                            <v-icon>settings</v-icon> Procesos
                        </v-toolbar-title>

                         <v-spacer></v-spacer>
                        <v-flex xs3>
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                color="#FF3D00"
                                solo-inverted
                                hide-details>

                            </v-text-field>
                        </v-flex>
                        <v-spacer></v-spacer>

                    </v-toolbar>

                    <!--TABLE PROCESOS-->
                    <v-data-table
                        :search="search"
                        item-key="idKpiMonitor"
                        :items="items"
                        :headers="headers"
                        :footer-props="{
                            prevIcon: 'arrow_back_ios',
                            nextIcon: 'arrow_forward_ios'
                        }"
                        :loading="loading"
                        loading-text="Cargando registros..."
                        >

                        <template v-slot:item.fecha="{ item }">
                            {{ item.fecha | dateFormat }}
                        </template>

                        <template v-slot:item.resultado="{ item }">
                            {{ item.resultado == null ? 'En Ejecución' : item.resultado}}
                        </template>

                        <template v-slot:item.action="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        @click="getRegistros(item)"
                                        v-on="on" 
                                        icon>
                                        <v-icon color="#FF3D00">description</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver registros</span>
                            </v-tooltip>
                        </template>

                    </v-data-table>
                </v-card>

                <!--DIALOG/TABLE REGISTROS-->
                <v-dialog v-model="dialogRegistros" width="750">
                    <v-card>
                        <br>
                        <v-card-text>
                            <v-card>
                                <v-toolbar
                                    color="#005BFF"
                                    dark>

                                    <v-toolbar-title>
                                        <v-icon>description</v-icon> Registro
                                    </v-toolbar-title>
                                </v-toolbar>

                                <!-- TABLE REGISTROS -->
                                <v-data-table
                                    :loading="loadingRegistro"
                                    item-key="idOperacion"
                                    :items="itemsRegistros"
                                    :footer-props="{
                                        prevIcon: 'arrow_back_ios',
                                        nextIcon: 'arrow_forward_ios'
                                    }"
                                    loading-text="Cargando registros..."
                                    :headers="headersRegistros">

                                    <template v-slot:item.action="{ item }">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    @click="findDataSalida(item)"
                                                    v-on="on" 
                                                    icon>
                                                    <v-icon color="#FF3D00">find_in_page</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Ver comando</span>
                                        </v-tooltip>
                                    </template>

                                </v-data-table>
                            </v-card>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <!--DIALOG DATA SALIDA-->
                <v-dialog dark v-model="dialogSalida" width="900"> 
                    <v-card>
                        <v-card-title class="headline">Comando</v-card-title>
                        <v-card-text v-if="dataSalida !== undefined">
                            <div style="white-space: pre-line;">{{dataSalida}}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="#01E9B2" style="color:#005BFF" @click="dialogSalida = false">Cerrar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import { environments } from '../environments/environments';
    import moment from 'moment';

    export default {
        name: 'KpiMonitor',
        data: () =>({
            dataSalida: '',
            dialogSalida: false,
            dialogRegistros: false,
            selected: [],
            selectedRegistros: [],
            search: '',
            items: [],
            headers: [
                { text: 'ID', value: 'idKpiMonitor' },
                { text: 'Fecha', value: 'fecha' },
                { text: 'Nodo', value: 'idNodo' },
                { text: 'Monitor', value: 'idKpi' },
                { text: 'Resultado', value: 'resultado' },
                { text: 'Registro', value: 'action', sortable: false }
            ],
            itemsRegistros: [],
            headersRegistros: [
                { text: 'Command', value: 'comando' },
                { text: 'Callback', value: 'idCallback' },
                { text: 'Date', value: 'fecha' },
                { text: 'Comando', value: 'action', sortable: false }
            ],
            loading: false,
            loadingRegistro: false,
            expanded: []
        }),
        filters:{
            dateFormat: (date) =>{
                return moment(date).format("YYYY-MM-DD - HH:mm:ss");
            }
        },
        beforeMount(){
            let self = this;
            self.loading = true;

            async function getDataKpiMonitor(){
                try {
                    const getReadKpiMonitor = await axios.get(`${environments.API_KPI_MONITOR}/MonitorKpis?filter[order]=idKpiMonitor%20DESC`)
                    if(getReadKpiMonitor)
                        return getReadKpiMonitor
                } catch (error) {
                    return error
                }
            }
            getDataKpiMonitor().then((response) =>{
                if(response.status == 200){

                    axios.get(`${environments.API_KPI_MONITOR}/Nodos`)
                    .then((responseNodos) =>{

                        axios.get(`${environments.API_KPI_MONITOR}/Kpis`)
                        .then((responseMonitor) =>{

                            const groupByIdNodo = responseNodos.data.reduce((acc, data) =>{
                                if(!acc[data.idNodo])
                                    acc[data.idNodo] = [];

                                acc[data.idNodo].push(data);
                                return acc;
                            }, {});

                            const groupByIdMonitor = responseMonitor.data.reduce((acc, data) =>{
                                if(!acc[data.idKpi])
                                    acc[data.idKpi] = [];

                                acc[data.idKpi].push(data);
                                return acc;
                            }, {});

                            let newItemsProcess = [];

                            response.data.forEach((value) =>{
                                newItemsProcess.push({
                                    idKpiMonitor: value.idKpiMonitor,
                                    fecha: value.fecha,
                                    idNodo: groupByIdNodo[value.idNodo][0]['nodo'],
                                    flujo: value.flujo,
                                    idKpi: groupByIdMonitor[value.idKpi][0]['nombre'],
                                    resultado: value.resultado,
                                    estado: value.estado,
                                    argumentos: value.argumentos
                                })
                            })

                            self.items = newItemsProcess;
                            self.loading = false;
                        })
                    })
                }
            })
            .catch((err) => { console.log(`Error al intentar listar data: ${err}`)} );
        },
        methods:{
            getRegistros(item){
                this.loadingRegistro = true;
                const indexIdKpi = item.idKpiMonitor;
                this.dialogRegistros = true;

                axios.get(`${environments.API_KPI_MONITOR}/OperacionLogs?filter=%7B%22where%22%3A%7B%22idKpiMonitor%22%3A%22${indexIdKpi}%22%7D%7D`)
                .then((response) =>{
                    if(response.status == 200) {

                        axios.get(`${environments.API_KPI_MONITOR}/Kpis`)
                        .then((responseMonitor) =>{

                            axios.get(`${environments.API_KPI_MONITOR}/Nodos`)
                            .then((responseNodos) =>{

                                axios.get(`${environments.API_KPI_MONITOR}/Callbacks`)
                                .then((responseCallbacks)  =>{

                                    const groypByCallbacks = responseCallbacks.data.reduce((acc, data) =>{
                                        if(!acc[data.idCallback])
                                            acc[data.idCallback] = [];

                                        acc[data.idCallback].push(data);
                                        return acc;
                                    },{});

                                    const groupByIdNodo = responseNodos.data.reduce((acc, data) =>{
                                        if(!acc[data.idNodo])
                                            acc[data.idNodo] = [];

                                        acc[data.idNodo].push(data);
                                        return acc;
                                    }, {});

                                    const groupByIdMonitor = responseMonitor.data.reduce((accumulator, data) =>{
                                        if(!accumulator[data.idKpi])
                                            accumulator[data.idKpi] = [];

                                        accumulator[data.idKpi].push(data);
                                        return accumulator;
                                    }, {});

                                    let newSalidaMonitor = [];

                                    response.data.forEach((value) =>{
                                        newSalidaMonitor.push({
                                            idOperacion: value.idOperacion,
                                            comando: value.comando,
                                            salida: value.salida,
                                            idNodo: groupByIdNodo[value.idNodo][0]['nodo'],
                                            idCallback: groypByCallbacks[value.idCallback][0]['callback'],
                                            fecha: value.fecha,
                                            idKpi: groupByIdMonitor[value.idKpi][0]['nombre']
                                        })
                                    })

                                    this.itemsRegistros = newSalidaMonitor;
                                    this.loadingRegistro = false;

                                })
                            })
                        })
                    }
                })
            },
            findDataSalida(item){
                const indexComando = item.salida;
                this.dialogSalida = true;
                this.dataSalida = indexComando;
            }

        }
    }
</script>