package com.example.ApiG11.Servicios;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ApiG11.Modelos.UsuarioModelo;
import com.example.ApiG11.Repositorios.UsuarioRepositorio;

@Service
public class UsuarioServicio {
    @Autowired
    UsuarioRepositorio repositorio;

    public UsuarioModelo guardarUsuario(UsuarioModelo usuario){
        return repositorio.save(usuario);
    }

    public ArrayList<UsuarioModelo> consultarUsuarios(){
        return (ArrayList<UsuarioModelo>) repositorio.findAll();
    }

    public Optional<UsuarioModelo> consultaNumero(Long numero){
        return repositorio.findById(numero);
    }

    public Boolean eliminaUsuario(Long numero){
        if(repositorio.existsById(numero)){
            repositorio.deleteById(numero);
            return true;
        }
        else{
            return false;
        }
        
    }

    public ArrayList<UsuarioModelo> buscaXfecha(String fecha){
        return repositorio.findByFecha(fecha);
    }
    
}
