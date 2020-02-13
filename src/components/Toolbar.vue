<template>
    <v-app-bar
        height="73"
        app
        elevation="0">

        <v-spacer></v-spacer>

        <v-flex xs2>
            <v-text-field
                color="#FF3D00"
                label="Search..."
                prepend-inner-icon="search"
                hide-details>
            </v-text-field>
        </v-flex>

        <v-btn icon>
            <v-badge color="pink" overlap left>
                <template v-slot:badge>
                    <span v-if="messages > 0">{{ messages }}</span>
                </template>            
                <v-icon size="28">notifications</v-icon>
            </v-badge>
        </v-btn>

        <v-menu bottom offset-y>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon>
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                    v-for="(item, index) in settings"
                    :key="index"
                    @click="setting(item.action)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

    </v-app-bar>
</template>

<script>
    export default {
        data(){
            return{
                settings: [
                    { title: "Salir", action: "logout" }
                ],
                messages: 3
            }
        },
        methods: {
            setting: action => {
                if (action == "logout")
                    window.location.replace("/");
            }
        }
    }
</script>