<template>
    <v-navigation-drawer
        app 
        absolute 
        permanent
        color="#005BFF"
        dark
        >

        <template v-slot:prepend>
            <v-list-item two-line>
                <div>
                    <v-img :src="logo" class="mt-3" width="70"></v-img>
                </div>
                <v-list-item-content>
                    <v-list-item-title class="bold ml-5 mt-3" style="color: #01E9B9">KPI MONITOR</v-list-item-title>
                    <v-list-item-subtitle class="bold ml-5" style="color: #01E9B9">ENTEL</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <br/>

        <v-divider></v-divider>

        <v-list>
            <v-list-item v-for="item in itemsToSide" :key="item.title" :to="item.path">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>
 
<script>
    export default {
        data() {
            return {
                logo: require("../assets/logo.png"),
                drawer: true,
                itemsToSide: [
                    { title: "Dashboard", icon: "dashboard", path: "/dashboard" },
                    { title: "Monitores", icon: "speed", path: "/monitores" },
                    { title: "Procesos", icon: "settings", path: "/procesos" },
                    { title: "Nodos", icon: "public", path: "/nodos" },
                    { title: "Callbacks", icon: "sync_problem", path: "/callbacks" },
                    { title: "Privilegios", icon: "people", path: "/privilegios" }
                ]
            };
        }
    };
</script>

