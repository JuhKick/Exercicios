function convertData() {
    const resultado = document.querySelector('#resultado');
    const valorDataFab = document.querySelector('.dataFabricação').value;
    const trimestre = parseInt(valorDataFab.charAt(0), 10);
    const ano = parseInt("20" + valorDataFab.slice(2), 10);

    if (isNaN(trimestre) || isNaN(ano)) {
        resultado.innerHTML = "Erro: Data de fabricação inválida.";
        return;
    }

    const mesesPorTrim = {
        1: 0,
        2: 3,
        3: 6,
        4: 9
    };

    const data = new Date(ano, mesesPorTrim[trimestre], 1);

    if (isNaN(data.getTime())) {
        resultado.innerHTML = "Erro: Data inválida.";
    } else {
        resultado.innerHTML = data.toDateString();
    }

    /*const dia = (data.getDate());
    const mes = (data.getMonth()+ 1);
    const anoFormatado = (data.getFullYear());

    const dataFabFormatada = `${dia}/${mes}/${anoFormatado}`;*/
       return data;

}

function calculoVencimento(evento) {
    evento.preventDefault();

    const form = document.querySelector('.form');
    const resultado = document.querySelector('#resultado');

    const dataInstalacaoSelect = form.querySelector('.dataInstalação');
    const dataInstalacao = dataInstalacaoSelect.value;

    const [ano, mes, dia] = dataInstalacao.split('-').map(Number);
    let trimestre;

    if (mes < 4) {
        trimestre = '1T';
    } else if (mes >= 4 && mes < 7) {
        trimestre = '2T';
    } else if (mes >= 7 && mes < 10) {
        trimestre = '3T';
    } else {
        trimestre = '4T';
    }
    
    const dataFab = convertData();
    
    const date = new Date(dataInstalacao)

    const difMilisec = date - dataFab;
    const difDias = Math.floor(difMilisec / (1000 * 60 * 60 * 24))

    const formulaValidade = (3650 - (difDias/2));
    const formulaExtensao = formulaValidade * 0.2;
    const formulaValidadeAno = formulaValidade / 365;
    const extensaoFinal = formulaExtensao / 90;
    const calculoValidadeAno = Math.round(formulaValidadeAno + ano);

    const numDeDigitos = Math.floor(Math.log10(calculoValidadeAno)) + 1;
    const validadeFinal = calculoValidadeAno % Math.pow(10, numDeDigitos - 2);

   resultado.innerHTML = (`Seu tempo de utilização a ser gravado na plaqueta é ${trimestre}${validadeFinal} + ${Math.floor(extensaoFinal)}T`);

   /*const milissegundosPorAno = 1000 * 60 * 60 * 24  * 365.25; // Inclui anos bissextos
   const diferencaEmAnos = Math.ceil(difMilisec / milissegundosPorAno);*/
  
    /*const diaFor = (date.getDate());
    const mesFor = (date.getMonth()+ 1);
    const anoFormatado = (date.getFullYear());

    const dataInsFormatada = `${diaFor}/${mesFor}/${anoFormatado}`;

    alert( typeof(dataInsFormatada))
    
    const [ano, mes, dia] = dataInstalacao.split('-').map(Number);*/    
}

const form = document.querySelector('.form');
form.addEventListener('submit', calculoVencimento);

