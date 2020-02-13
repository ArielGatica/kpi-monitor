<template>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
            <v-flex xs3>                
                <v-alert
                    v-model="alert"
                    text
                    prominent
                    dense
                    transition="scale-transition"
                    type="error" 
                    icon="vpn_key"
                    >
                    Auth error, try again.
                </v-alert>

                <v-card class="elevation-7">
                    <br>
                    <v-img
                        id="logoEntel"
                        align="right"
                        :src="logo"
                        width="120"
                        height="110"
                    />
                    <br><h2 align="center" class="headline" style="color:#005BFF">KPI Monitor</h2>
                    <br><br>
                    <v-card-text>
                        <v-text-field
                            v-model="dataLogin.user"
                            rounded
                            color="#005BFF"
                            append-icon="person"
                            label="Usuario" 
                            solo>
                        </v-text-field>
                        <v-text-field
                            v-model="dataLogin.pass"
                            @keypress.enter="login()"
                            rounded
                            color="#005BFF"
                            label="Contraseña"
                            @click:append="show = !show"
                            :append-icon="show ? 'visibility_off' : 'visibility'"
                            :type="show ? 'text' : 'password'"
                            solo>
                        </v-text-field>
                        <v-checkbox
                            v-model="remember"
                            color="#005BFF"
                            label="¿Recordar credenciales?">
                        </v-checkbox>
                        <v-btn
                            @click="login()"
                            :loading="loading"
                            rounded
                            large
                            dark
                            color="#005BFF"
                            block>
                            Ingresar
                        </v-btn>
                        <br>
                        <v-btn
                            @click="loading = false; clearData()"
                            rounded
                            large
                            dark
                            color="#FF3D00"
                            block>
                            Otro Usuario
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () =>({
            logo: require('../assets/logo-login.png'),
            remember: true,
            loading: false,
            alert: false,
            show: false,
            dataLogin: {
                user: '',
                pass: ''
            }
        }),
        methods:{   
            login(){
                this.loading = true;

                if(this.dataLogin.user == 'admin' && this.dataLogin.pass == 'admin'){
                    this.loading = false;
                    this.$router.push('/dashboard')
                    this.alert = false;
                }else{
                    this.loading = false;
                    this.alert = true;
                }
            },
            clearData(){
                this.dataLogin.user = '';
                this.dataLogin.pass = '';
            }
        }
    }
</script>

<style scoped>
    #logoEntel{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>