<template>
  <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            
            <v-col cols="12" sm="5">
                <v-flex xs10>
                    <v-card class="elevation-2">
                        <v-card-title>
                            <v-flex xs6>
                                <v-icon class="orange--text" size="80">insert_chart_outlined</v-icon>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <h3 class="display-2 black--text">{{total}}</h3>
                                <h6 class="caption black--text text--lighten-1">TOTAL MONITOREOS REALIZADOS</h6>
                            </v-flex>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <div class="body-1 black--text text--lighten-1">ÚLTIMAS 24 HRS.</div>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-col>
               
            <v-col cols="12" sm="5">
                <v-flex xs10>
                    <v-card class="elevation-2">
                        <v-card-title>
                            <v-flex xs6>
                                <v-icon class="blue--text" size="80">public</v-icon>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <h3 class="display-2 black--text">{{nodos}}</h3>
                                <h6 class="caption black--text text--lighten-1">TOTAL NODOS MONITOREADOS</h6>
                            </v-flex>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <div class="body-1 black--text text--lighten-1">ÚLTIMAS 24 HRS.</div>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-col>

            <v-col cols="12" sm="5">
                <v-flex xs10>
                    <v-card class="elevation-2">
                        <v-card-title>
                            <v-flex xs6>
                                <v-icon class="green--text" size="80">check_circle</v-icon>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <h3 class="display-2 black--text">{{ok}}</h3>
                                <h6 class="caption black--text text--lighten-1">TOTAL MONITOREOS OK</h6>
                            </v-flex>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <div class="body-1 black--text text--lighten-1">ÚLTIMAS 24 HRS.</div>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-col>

            <v-col cols="12" sm="5">
                <v-flex xs10>
                    <v-card class="elevation-2">
                        <v-card-title>
                            <v-flex xs6>
                                <v-icon class="red--text" size="80">cancel</v-icon>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <h3 class="display-2 black--text">{{nok}}</h3>
                                <h6 class="caption black--text text--lighten-1">TOTAL MONITOREOS NOK</h6>
                            </v-flex>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <div class="body-1 black--text text--lighten-1">ÚLTIMAS 24 HRS.</div>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-col>

        </v-row>
  </v-container>
</template>

<script>
    import axios from 'axios';
    import { environments } from '../environments/environments';

    export default {
        data:() =>({
            ok: '',
            nok: '',
            nodos: '',
            total : ''
        }),
        beforeMount(){
            let self = this;

            async function getDataDashboard(){
                try {
                    const readDashboard = await axios.get(`${environments.API_KPI_DASHBOARD}dashboard`)
                    if(readDashboard)
                        return readDashboard
                } catch (error) {
                    return error;
                }
            }
            getDataDashboard().then((response) =>{
                if(response.status == 200){
                    self.nodos = response.data[0].cantidadNodos;
                    self.ok = response.data[1].totalok;
                    self.nok = response.data[2].totalnok
                    self.total = response.data[3].total;
                }
            })
            .catch((error) => { console.log(`Error al intentar obtener registros dashboard: ${error}`) });
        }
    }
</script>