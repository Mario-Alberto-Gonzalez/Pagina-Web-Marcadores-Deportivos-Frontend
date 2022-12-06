package com.example.ApiG11.Modelos;

import org.springframework.data.annotation.Id;

public class EquipoModelo {

    @Id
    private int id;
    private String deporte;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getDeporte() {
        return deporte;
    }
    public void setDeporte(String deporte) {
        this.deporte = deporte;
    }
    
    
}
