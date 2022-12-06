const app= Vue.createApp({
    data(){
        return {
           opcion:0
        };    
    },
    methods:{
    }
});
        app.component("formulario-guardar",{
            data(){
                return{
                    numero:"",
                    deporte:"",
                    equipo1:"",
                    equipo2:"",
                    fecha:"",
                    marcador1:"",
                    marcador2:"",
                };
            },
            template:`
            <div>
            <h3>REGISTRO DE USUARIOS</h3>
        <form v-on:submit.prevent="guardarUsuario">
            <table>
                <tr>
                    <td>Numero</td>
                    <td><input type="text" v-model="numero"></td>
                </tr>
                <tr>
                    <td>Deporte</td>
                    <td><input type="text" v-model="deporte"></td>
                </tr>
                <tr>
                    <td>Equipo1</td>
                    <td><input type="text" v-model="equipo1"></td>
                </tr>
                <tr>
                    <td>Equipo2</td>
                    <td><input type="text" v-model="equipo2"></td>
                </tr>
                <tr>
                    <td>Fecha</td>
                    <td><input type="text" v-model="fecha"></td>
                </tr>
                <tr>
                    <td>Marcador1</td>
                    <td><input type="number" v-model="marcador1"></td>
                </tr>
                <tr>
                    <td>Marcador2</td>
                    <td><input type="number" v-model="marcador2"></td>
                </tr>
            </table>
            <input type="submit" class="btn btn-primary" value="Guardar Usuario">
        </form>
            </div>
            `,
            methods:{
                guardarUsuario(){
                    //console.log(this.numero);
                    const endpoint="http://localhost:8080/usuario/guardar";
                    const opciones={
                        method:"POST",
                        headers:{'Content-Type':"application/json"},
                        body:JSON.stringify({
                            numero:this.numero,
                            deporte:this.deporte,
                            equipo1:this.equipo1,
                            equipo2:this.equipo2,
                            fecha:this.fecha,
                            marcador1:this.marcador1,
                            marcador2:this.marcador2,
                        })
                    };
        
                    fetch(endpoint,opciones).then(async response=>{
                        
                        alertify.alert("Usuario guardado", function(){
                            alertify.success('Guardado');
                        });
                        
                    })
                },

            }
        });
        

            app.component("borrar-usuario",{
                data(){
                    return{
                        idEliminar:"",
                    };
                },
                template:`
                 <div>
                 <h3>BORRAR USUARIO</h3>
                 <label>Numero</label>
                 <input type="text" v-model="idEliminar">
                 <input type="button" class="btn btn-danger" v-on:click="borrarUsuario" value="ELIMINAR">
                 </div>
                `,
                methods:{
                    borrarUsuario(){
                        const endpoint="http://localhost:8080/usuario/borrar/"+this.idEliminar;
                        const opciones={method:"DELETE"};
                        fetch(endpoint,opciones).then(async response=>{
                            var respuesta=await response.json();
                            if(respuesta){
                                alertify.success('Usuario Borrado');
                            }else{
                                alertify.error('No se Encontro el Usuario!');
                            }
                            
                        })
            
                        
                    },
                }

            });



                app.component("consultar-usuario",{
                    data(){
                        return{
                            busquedaNum:"",
                            usuario:{},
                        };
                    },
                    template:`
                     <div>
                     <h3>
                     CONSULTAR USUARIO
                 </h3>
                 <label># Numero</label>
                 <input type="text" v-model="busquedaNum">
                 <input class="btn btn-info" type="button" value="BUSCAR" v-on:click="buscarNumero"><br>
                 <label>Numero: {{usuario.numero}}</label><br>
                 <label>Deporte: {{ usuario.deporte}}</label><br>
                 <label>Equipo1: {{ usuario.equipo1}}</label><br>
                 <label>Equipo2: {{usuario.equipo2}}</label><br>
                 <label>Fecha: {{usuario.fecha}}</label><br>
                 <label>Marcador1: {{usuario.marcador1}}</label><br>
                 <label>Marcador2: {{usuario.marcador2}}</label><br>
                     </div>
                    `,
                    methods:{
                        buscarNumero(){
                            const endpoint="http://localhost:8080/usuario/consultaNumero/"+this.busquedaNum;
                            const opciones={method:"GET"}
                            fetch(endpoint,opciones).then(async response=>{
                                this.usuario=await response.json();
                            })
                        },
                    }


                });

                app.component("buscar-usuario",{
                    data(){
                        return{
                            usuarios:[],
                            buscaFecha:""
                        };
                    },
                    template:`
                     <div>
                     <label>Fecha</label><input type="text" v-model="buscaFecha">
                     <input type="button" value="BUSCAR" class="btn btn-primary" v-on:click="buscarFecha"><br>
             
                     <input class="btn btn-primary" type="button" value="VER REGISTROS" v-on:click="consultarUsuarios">
                     <table class="table table-striped">
                         <thead>
                             <th>Numero</th>
                             <th>Deporte</th>
                             <th>Equipo1</th>
                             <th>Equipo2</th>
                             <th>Fecha</th>
                             <th>Marcador1</th>
                             <th>Marcador2</th>
                         </thead>
                         <tbody>
                             <tr v-for="usuario in usuarios">
                                 <td>{{ usuario.numero }}</td>
                                 <td>{{ usuario.deporte }}</td>
                                 <td>{{ usuario.equipo1 }}</td>
                                 <td>{{ usuario.equipo2 }}</td>
                                 <td>{{ usuario.fecha }}</td>
                                 <td>{{ usuario.marcador1 }}</td>
                                 <td>{{ usuario.marcador2 }}</td>
                             </tr>
                         </tbody>
             
                     </table>   
                     </div>
                    `,
                    methods:{
                        consultarUsuarios(){
                            const endpoint="http://localhost:8080/usuario/consultar";
                            const opciones={method:"GET"};
                            fetch(endpoint,opciones).then(async response=>{
                                this.usuarios=await response.json();
                            })
                
                        },

                
                        buscarFecha(){
                            const endpoint="http://localhost:8080/usuario/buscaxfecha/"+this.buscaFecha;
                            const opciones={method:"GET"};
                
                            fetch(endpoint,opciones).then(async response=>{
                                this.usuarios=await response.json();
                            })
                        },
                    }
                });      
app.mount("#aplicacion");