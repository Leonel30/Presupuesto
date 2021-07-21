const ingresos = [
    new Ingreso("Ejemplo ingreso (borrar para usar)",2100),
    
    
]
const egresos = [
    new Egreso("Ejemplo egreso(borrar para usar)",1000),
    
    
]

let cargarApp = ()=> {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
    
}

let totalIngresos = ()=>{

    let ingresosTotales = 0;

    for( let ingreso of ingresos){
        ingresosTotales += ingreso.valor;
    }
    return ingresosTotales;
}

let totalEgresos = ()=> {

    let egresosTotales = 0;
    for( let egreso of egresos){
        egresosTotales += egreso.valor;
    }
    return egresosTotales;
}


let cargarCabecero = ()=> {
    let presupuestoTotal = totalIngresos() - totalEgresos();
    let porcentaje = totalEgresos() / totalIngresos() ;
    document.getElementById("presupuesto").innerHTML =formatoMoneda(presupuestoTotal);
    document.getElementById("porcentaje").innerHTML =formatoPorcentaje(porcentaje);
    document.getElementById("ingreso").innerHTML =formatoMoneda(totalIngresos());
    document.getElementById("egreso").innerHTML =formatoMoneda(totalEgresos());
}
const formatoMoneda  = (valor) => {
    return valor.toLocaleString('es-AR',{style:'currency', currency:'ARS',minimumFractionDigits:2})

}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-AR', {style:'percent',minimumFractionDigits:2});
}

const cargarIngresos = ()=> {
    let ingresosHTML = "";
    for ( let ingreso of ingresos){
        ingresosHTML+= crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML=ingresosHTML;

};

const crearIngresoHTML = (ingreso)=>{

    let ingresoHTML =`
    <div class="elemento">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha2">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.idIngresos})"></ion-icon>
            </button>
        </div>
    </div>
    </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (idIngresos)=>{
    let indiceEliminar = ingresos.findIndex((ingreso) =>{ return ingreso.idIngresos===idIngresos});
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
    
}
const cargarEgresos = ()=> {
    let egresosHTML = "";
    for ( let egreso of egresos){
        egresosHTML+= crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML=egresosHTML;

}
const crearEgresosHTML = (egreso)=>{
    let egresoHTML =`
    <div class="elemento">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha2">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="eliminarEgreso(${egreso.idEgresos})"></ion-icon>
            </button>
        </div>
    </div>
    </div>
    `;
    return egresoHTML;
}
const eliminarEgreso = (idEgresos)=>{
    let indiceEliminar = egresos.findIndex((egreso) =>{ return egreso.idEgresos===idEgresos});
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
    
}

let agregarDato =()=>{
    let formulario = document.forms["formulario"];
    let tipo = formulario["tipo"];
    let descripcion = formulario["descripcion"];
    let valor = formulario["valor"];
    if(descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();

        }else if(tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();

        }
    }
}

