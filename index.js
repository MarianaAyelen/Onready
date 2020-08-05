class Concesionario {
    
    vehiculos = [];


    cargarVehiculos(jsonVehiculos){
        jsonVehiculos.listaVehiculos.forEach(unVehiculo =>{
            let marca = unVehiculo.Marca;
            let modelo = unVehiculo.Modelo;
            let precio = unVehiculo.Precio;

           
            if(unVehiculo.Puertas != undefined){
                let puertas = unVehiculo.Puertas;            
                let unAuto = new Auto(marca,modelo,precio,puertas);
                this.vehiculos.push(unAuto);
            }else{
                let cilindrada = unVehiculo.Cilindrada;                
                let unaMoto = new Moto(marca,modelo,precio,cilindrada);
                this.vehiculos.push(unaMoto);
            }
        })
    }

    imprimirVehiculos(){
        this.vehiculos.forEach(unVehiculo => {
            unVehiculo.imprimirDetalle();
        });
    }
}

class Vehiculo{
   
    marca;
    modelo;
    precio;

    constructor(unaMarca, unModelo, unValor){
        this.marca = unaMarca;
        this.modelo = unModelo;
        this.precio = unValor;

    }

    imprimirDetalle(){};
}

class Auto extends Vehiculo{
    puertas;

    constructor(unaMarca, unModelo, unValor, cantPuertas){
        super(unaMarca, unModelo, unValor);
        this.puertas = cantPuertas;
    }

    imprimirDetalle(){
        let detalle = "";

        detalle += "Marca: " + this.marca + " //";

        console.log(detalle);
    }
}

class Moto extends Vehiculo {
    cilindrada;

    constructor(unaMarca, unModelo, unValor, cilindrada){
        super(unaMarca, unModelo, unValor);
        this.cilindrada = cilindrada;
    };

    imprimirDetalle(){
        console.log(this.marca, this.modelo, this.precio, this.cilindrada);
    }
}






const fs = require('fs');
let data = fs.readFileSync('datos.json');
let jsonVehiculos = JSON.parse(data);

let unConcesionario = new Concesionario();

unConcesionario.cargarVehiculos(jsonVehiculos);

unConcesionario.imprimirVehiculos();
