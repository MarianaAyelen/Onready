const separador = "=============================";

class Concesionario {
    
    constructor(){
        this.listaDeVehiculos = [];
    }

    cargarVehiculos(jsonVehiculos){
        jsonVehiculos.listaVehiculos.forEach(unVehiculo =>{
            let marca = unVehiculo.Marca;
            let modelo = unVehiculo.Modelo;
            let precio = unVehiculo.Precio;

           
            if(unVehiculo.Puertas != undefined){
                let puertas = unVehiculo.Puertas;            
                let unAuto = new Auto(marca,modelo,precio,puertas);
                this.listaDeVehiculos.push(unAuto);
            }else{
                let cilindrada = unVehiculo.Cilindrada;                
                let unaMoto = new Moto(marca,modelo,precio,cilindrada);
                this.listaDeVehiculos.push(unaMoto);
            }
        })
    }

    imprimirVehiculos(){
        this.listaDeVehiculos.forEach(unVehiculo => {
            let detalle = "";
            let caracteristicaExtra =  unVehiculo.getCaracteristicaExtra();
            detalle += "Marca: " + unVehiculo.getMarca() + " // ";
            detalle += "Modelo: " + unVehiculo.getModelo() + " // ";
            detalle += caracteristicaExtra.caracteristica + ": " + caracteristicaExtra.valor + " // ";
            detalle += "Precio: $" + unVehiculo.getPrecio();
            console.log(detalle);
        });
        this.imprimirSeparador(separador);
    };
    imprimirEstadisitica(){
        let vehiculoMasCaro;
        let vehiculoMasBarato;
        let vehiculosConY = [];

        this.listaDeVehiculos.forEach(unVehiculo => {
            let precio = unVehiculo.getPrecioNumero();
            if(vehiculoMasCaro == null){
                vehiculoMasCaro = unVehiculo;
            }else if(precio > vehiculoMasCaro.getPrecioNumero()){
                vehiculoMasCaro = unVehiculo;
            };

            if(vehiculoMasBarato == null){
                vehiculoMasBarato = unVehiculo;
            }else if(precio < vehiculoMasBarato.getPrecioNumero()){
                vehiculoMasBarato = unVehiculo;
            };

            if(unVehiculo.getModelo().includes('Y')){
                vehiculosConY.push(unVehiculo);
            }
        });
        this.imprimirMasCaro(vehiculoMasCaro);
        this.imprimirMasBarato(vehiculoMasBarato);
        this.imprimirVehiculosConY(vehiculosConY);
        this.imprimirSeparador(separador);
    };

    ordenarPorPrecio(){
        
        this.listaDeVehiculos.sort(function(unVehiculo,otroVehiculo){
            return otroVehiculo.getPrecio() - unVehiculo.getPrecio();
        })

        console.log("Vehiculos ordenados por precio de mayor a menor: ")
        this.listaDeVehiculos.forEach(unVehiculo =>{
            console.log(unVehiculo.getMarca() + " " +  unVehiculo.getModelo());
        })
    }
    imprimirMasCaro(unVehiculo){
        console.log("Vehículo mas caro:",unVehiculo.getMarca(),unVehiculo.getModelo() );
    };

    imprimirMasBarato(unVehiculo){
        console.log("Vehículo mas barato:",unVehiculo.getMarca(),unVehiculo.getModelo());
    };

    imprimirVehiculosConY(listaVehiculos){
        let detalleVehiculosConY = "Vehículo que contiene en el modelo la letra 'Y': ";

       
        listaVehiculos.forEach(unVehiculo =>{
            detalleVehiculosConY += unVehiculo.getMarca() + " " + unVehiculo.getModelo() + " $" + unVehiculo.getPrecio();

        });
        console.log(detalleVehiculosConY);
        
    };
    imprimirSeparador(unSeparador){
        console.log(unSeparador);
    }

}

class Vehiculo{

    constructor(unaMarca, unModelo, unValor){
        this.marca = unaMarca;
        this.modelo = unModelo;
        this.precio = unValor;
  
    }

    getMarca(){
        return this.marca;
    }
    getModelo(){
        return this.modelo;
    }
    getPrecio(){
        return this.precio;
    }
    getPrecioNumero(){
        return parseFloat(this.precio.replace(".",""))
    }

    getCaracteristicaExtra(){};


}

class Auto extends Vehiculo{


    constructor(unaMarca, unModelo, unValor, cantPuertas){
        super(unaMarca, unModelo, unValor);
        this.puertas = cantPuertas;
    }
    getCaracteristicaExtra(){
        return {caracteristica:"Puertas" , valor: this.puertas};
    }

}

class Moto extends Vehiculo {


    constructor(unaMarca, unModelo, unValor, cilindrada){
        super(unaMarca, unModelo, unValor);
        this.cilindrada = cilindrada;
    };

    getCaracteristicaExtra(){
        return {caracteristica:"Cilindrada" , valor: this.cilindrada};
    };
}






const fs = require('fs');
let data = fs.readFileSync('datos.json');
let jsonVehiculos = JSON.parse(data);

let unConcesionario = new Concesionario();

unConcesionario.cargarVehiculos(jsonVehiculos);
unConcesionario.imprimirVehiculos();
unConcesionario.imprimirEstadisitica();
unConcesionario.ordenarPorPrecio();
