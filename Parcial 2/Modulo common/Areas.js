function areacuadrado(lado){
    return lado*lado;
}

function areatriangulo(base, altura){
    return ((base*altura)/2);
}

function suma(num1, num2){
    return num1+num2;
}
function resta(num1, num2){
    return num1-num2;
}
function multiplicacion(num1, num2){
    return num1*num2;
}


module.exports.areacuadrado=areacuadrado;
module.exports.areatriangulo=areatriangulo;
module.exports.suma=suma;
module.exports.resta=resta;
module.exports.multiplicacion=multiplicacion;
//console.log(_dirname);
//console.log(_filename);
console.log(module);