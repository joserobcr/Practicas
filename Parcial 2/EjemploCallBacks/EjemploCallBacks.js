setTimeout(function(){
    console.log("El temporizador ha llegado a cero...")
}, 1000);

let mensaje = function(){
    console.log("Otro mensaje...");
};

setTimeout(mensaje, 3000);
