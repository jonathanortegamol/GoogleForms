
function selector(){
    const divS = document.createElement("div");
    divS.setAttribute("class","col-4")
    const cbxS = document.createElement("select");
    cbxS.setAttribute("class","cbx");
    const opciones = ["Escoja Tipo","Texto","Verdadero|Falso","Múltiple"];
    for(let k of opciones){
        let opt = document.createElement('option');
        opt.value=k;
        opt.textContent = k;
        cbxS.appendChild(opt);
    }
    divS.appendChild(cbxS);
    return divS;     
}

function defaultQuestion(){
    const divP = document.createElement("div");
    divP.setAttribute("class","border row mt-3 align-items-center p-3 rounded-2")

    const formP = document.createElement("form");
    formP.setAttribute("class","formP col-7")

    const formA = document.createElement("form");
    formA.setAttribute("class","formA col-12 border rounded-2 mt-1 bg-light")

    const lblP = document.createElement("label");
    const titP = document.createElement("input");
    
    lblP.setAttribute("for","titulo-pregunta");
    lblP.appendChild(document.createTextNode("Título Pregunta"));
    titP.setAttribute("id","titulo-pregunta");
    titP.setAttribute("type","text");

    formP.appendChild(lblP);
    formP.appendChild(titP);

    divP.appendChild(formP);
    divP.appendChild(selector());
    divP.appendChild(formA);
    
    return divP;
}

let containerP = document.getElementById("container-preguntas");
let btn = document.getElementById("addPregunta");
btn.addEventListener('click', add);

function add(){
    let newQuestion = defaultQuestion();
    containerP.appendChild(newQuestion);

    // Selecciona el elemento select dentro de la nueva pregunta
    let cbx = newQuestion.querySelector('.cbx');
    let frm = newQuestion.querySelector('.formA')
    // Agrega el evento change al elemento select
    cbx.addEventListener('change', function(){
        cambiarPregunta(cbx,frm);
    });
}

let cont_radio = 0;
function cambiarPregunta(cbx,frm){

    while (frm.firstChild) {
        frm.removeChild(frm.firstChild);
      }
    

    const lblP = document.createElement("label");
    lblP.appendChild(document.createTextNode("Ingrese Respuesta"));
    frm.appendChild(lblP);
    if(cbx.value == "Texto"){
        const txtP = document.createElement("input");
        txtP.setAttribute("type","text");
        frm.appendChild(txtP);
    }else if(cbx.value == "Verdadero|Falso"){
        const divR = document.createElement("div");
        const lblV = document.createElement("label");
        const lblF = document.createElement("label");
        const verdadR = document.createElement("input");
        const falsoR = document.createElement("input");


        lblV.appendChild(document.createTextNode("Verdadero"));
        lblF.appendChild(document.createTextNode("Falso"));
        lblV.setAttribute("for",`radio-verdadero-${cont_radio}`);
        lblF.setAttribute("for",`radio-falso-${cont_radio}`);

        verdadR.setAttribute("type","radio");
        falsoR.setAttribute("type","radio");

        verdadR.setAttribute("name","radio");
        falsoR.setAttribute("name","radio")
        
        verdadR.setAttribute("value","verdadero");
        falsoR.setAttribute("value","falso")

        divR.appendChild(lblV);
        divR.appendChild(verdadR);
        divR.appendChild(lblF);
        divR.appendChild(falsoR);

        frm.appendChild(divR);

        cont_radio++;
    }
    else if (cbx.value == "Múltiple"){
        const divC = document.createElement("div");
        const btnC = document.createElement("button");
        btnC.setAttribute("type","button");
        btnC.setAttribute("class","btnAddOp");

        btnC.appendChild(document.createTextNode("Agregar Opcion"));

        btnC.addEventListener('click',function(){
            divC.appendChild(addOption());
        });
        
        divC.appendChild(btnC);
        frm.appendChild(divC);

    }
}

function addOption(){
    const divC = document.createElement("div");
    const checkB = document.createElement("input");
    const lblC = document.createElement("label");
    checkB.setAttribute("type","checkbox");
    lblC.appendChild(document.createTextNode("Click Aqui para cambiar"));

    lblC.addEventListener('click',function(){
        let respuesta = prompt("Ingrese el nuevo nombre para la opción: ");
        if (respuesta !== null && respuesta !== "") {
            // Eliminar cualquier contenido existente en el label
            while (lblC.firstChild) {
                lblC.removeChild(lblC.firstChild);
            }
            // Agregar el nuevo texto
            lblC.appendChild(document.createTextNode(respuesta));
        }
    });

    divC.appendChild(lblC);
    divC.appendChild(checkB);

    return divC;
}



