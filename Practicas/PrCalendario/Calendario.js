//Datos
meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
lasemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
diassemana = ["lun","mar","mie","jue","vie","sab","dom"];

function cabecera(){
    tit.innerHTML = meses[mescal] + " de " + annocal;
    mesant = mescal - 1;
    mespos = mescal + 1;
    if(mesant<0) mesant = 11;
    if(mespos>11) mespos = 0;
    ant.innerHTML = meses[mesant];
    pos.innerHTML = meses[mespos];
}

function primeralinea(){
    for(var i = 0; i < 7; i++){
        celda0 = f0.getElementsByTagName("th")[i];
        celda0.innerHTML = diassemana[i];
    }
}

function escribirdias(){
    primeromes = new Date(annocal, mescal, "1");
    prsem = primeromes.getDay();
    prsem--;
    if(prsem == -1) prsem = 6;
    
    diaprmes = primeromes.getDate();
    prcelda = diaprmes-prsem;
    empezar = primeromes.setDate(prcelda);
    diames = new Date();
    diames.setTime(empezar);

    for(var i=1; i<7; i++){
        fila = document.getElementById("fila"+i);
        for(var j=0; j<7; j++){
            midia = diames.getDate();
            mimes = diames.getMonth();
            mianno = diames.getFullYear();
            celda = fila.getElementsByTagName("td")[j];
            celda.innerHTML = midia;
            if(j===6){
                celda.style.color = "#f11445";
            }
            if(mimes != mescal){
                celda.style.color = "#a0babc";
            }
            if(mimes === meshoy && midia === diahoy && mianno == annohoy){
                celda.style.backgroundColor = "#1abc9c";
                celda.innerHTML = "<cite title='Fecha Actual'>" + midia + "</cite>"
            }
            else{
                celda.style.backgroundColor = "#eee";
            }
            midia = midia + 1;
            diames.setDate(midia);
        }
    }
}

function mesantes(){
    nuevomes = new Date();
    primeromes--;
    nuevomes.setTime(primeromes);
    mescal = nuevomes.getMonth();
    annocal = nuevomes.getFullYear();
    cabecera();
    escribirdias();
}

function mesdespues(){
    nuevomes = new Date();
    tiempounix = primeromes.getTime();
    tiempounix = tiempounix + (45*24*60*60*1000);
    nuevomes.setTime(tiempounix);
    mescal = nuevomes.getMonth();
    annocal = nuevomes.getFullYear();
    cabecera();
    escribirdias();
}

function actualizar(){
    mescal = hoy.getMonth();
    annocal = hoy.getFullYear();
    cabecera();
    escribirdias();
}

function mifecha(){
    mianno = document.buscar.buscaanno.value;
    listameses = document.buscar.buscames;
    opciones = listameses.options;
    num = listameses.selectedIndex+1;
    mimes = opciones[num].value;
    if (isNaN(mianno) || mianno < 1){
        alert("El año no es válido:\ndebe ser un número mayor que 0");
    }
    else{
        mife = new Date();
        mife.setMonth(mimes);
        mife.setFullYear(mianno);
        mescal = mife.getMonth();
        annocal = mife.getFullYear();
        cabecera();
        escribirdias();
    }
    nuevomes = new Date();
    tiempounix = primeromes.getTime();
    tiempounix = tiempounix + (45*24*60*60*1000);
    nuevomes.setTime(primeromes);
    mescal = nuevomes.getMonth();
    annocal = nuevomes.getFullYear();
    cabecera();
    escribirdias();
}


window.onload = function(){
    hoy = new Date();
    diasemhoy = hoy.getDay();
    diahoy = hoy.getDate();
    meshoy = hoy.getMonth();
    annohoy = hoy.getFullYear();

    tit = document.getElementById("titulos");
    ant = document.getElementById("anterior");
    pos = document.getElementById("posterior");

    f0 = document.getElementById("fila0");

    pie = document.getElementById("fechaactual");
    pie.innerHTML += lasemana[diasemhoy] + ", " + diahoy + " de " + meses[meshoy] + " de " + annohoy;
    document.buscar.buscaanno.value = annohoy;
    mescal = meshoy;
    annocal = annohoy;

    cabecera();
    primeralinea();
    escribirdias();
}