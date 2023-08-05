//PARA PARTE 01 DO PREENCHIMENTO DO FORMULÁRIO

// Parte 01 - Campo 2 Função para habilitar ou desabilitar o campo "Número da ART vinculada" com base na seleção do usuário
function toggleNumeroArtVinculada() {
    const formaRegistroArt = document.getElementById("forma-registro-art");
    const numeroArtVinculada = document.getElementById("numero-art-vinculada");

    if (formaRegistroArt.value === "substituicao-modificacao" || formaRegistroArt.value === "substituicao-retificada") {
        numeroArtVinculada.disabled = false; // Habilita o campo se a opção de substituição for selecionada
    } else {
        numeroArtVinculada.disabled = true; // Desabilita o campo para outras opções selecionadas
        numeroArtVinculada.value = ""; // Limpa o campo ao desabilitar
    }
}

// Chamada inicial para garantir que o campo seja corretamente ativado ou desativado no carregamento da página
toggleNumeroArtVinculada();



//Modal para lupa abrir uma caixa que pesquisa e preenche automaticamente o Registro da empresa, pelo CNPJ, por exemplo.
// Função para abrir o modal
function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    // Adiciona o evento de teclado para fechar o modal quando a tecla ESC for pressionada
    document.addEventListener("keydown", closeModalOnEsc);
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";

    // Remove o evento de teclado para evitar chamadas indesejadas
    document.removeEventListener("keydown", closeModalOnEsc);
}

// Função para fechar o modal quando a tecla ESC for pressionada
function closeModalOnEsc(event) {
    if (event.keyCode === 27) {
        closeModal();
    }
}


//PARA PARTE 02 DO PREENCHIMENTO DO FORMULÁRIO

//De acordo com os números atribuidos co campo CPF/CNPJ, é formatado um padrão de preenchimento.
function formatarCPFCNPJ() {
    const cpfCnpjInput = document.getElementById("cpf-cnpj");
    let valor = cpfCnpjInput.value;

    valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (valor.length > 11) {
        // Se o valor tiver mais de 11 dígitos, formata como CNPJ
        valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    } else {
        // Caso contrário, formata como CPF
        valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }

    cpfCnpjInput.value = valor;
}

// Esconhe entre CEP ou localização geográfica
function toggleCamposCEP() {
    const possuiCEP = document.getElementById("possui-cep-sim").checked;
    const camposCEP = document.getElementById("campos-cep");
    const camposCoordenadas = document.getElementById("campos-coordenadas");

    camposCEP.style.display = possuiCEP ? "block" : "none";
    camposCoordenadas.style.display = possuiCEP ? "none" : "block";
}

function formatarCEP() {
    const cepInput = document.getElementById("cep");
    const cepValue = cepInput.value.replace(/\D/g, "");
    if (cepValue.length === 8) {
        cepInput.value = `${cepValue.substr(0, 5)}-${cepValue.substr(5, 3)}`;
    }
}

//Valida o CEP dependendo da escolha, se o profisisonal possui ou não CEP.
function validarCEP() {
    // Verifica se o usuário escolheu uma opção (possui CEP ou não)
    var possuiCepSim = document.getElementById("possui-cep-sim").checked;
    var possuiCepNao = document.getElementById("possui-cep-nao").checked;

    if (!possuiCepSim && !possuiCepNao) {
        alert("Por favor, escolha uma opção: possui CEP ou não.");
        return false; // Impede o envio do formulário
    }

    if (possuiCepSim) {
        var cep = document.getElementById("cep").value;
        if (cep.trim() === "") {
            alert("Por favor, preencha o campo CEP.");
            return false; // Impede o envio do formulário
        }
        // Se possui CEP, não precisa validar cidade, latitude e longitude
    } else {
        var cidade = document.getElementById("cidade").value;
        var latitude = document.getElementById("latitude").value;
        var longitude = document.getElementById("longitude").value;
        if (cidade.trim() === "" || latitude.trim() === "" || longitude.trim() === "") {
            alert("Por favor, preencha todos os campos da cidade e coordenadas.");
            return false; // Impede o envio do formulário
        }
        // Se não possui CEP, não precisa validar o campo CEP
    }

    // O formulário será enviado se todas as validações passarem
    return true;
}


// Configurar o datepicker para o campo "data-contrato"
document.addEventListener('DOMContentLoaded', function () {
    // Configurar o flatpickr para o formato brasileiro e idioma português
    flatpickr("#celebradoEm", {
        dateFormat: 'd/m/Y',
        locale: 'pt', // Definir o idioma como português
        // Outras configurações podem ser adicionadas conforme necessário
    });
});




// Formatação do valor inserido para o Custo da obra e Valor da construção, conforme o País selecionado, seguindo a ISO 4217.
let codigoMoeda = 'BRL';

function formatarDinheiro(input) {
    const valor = input.value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: codigoMoeda }).format(
        valor / 100
    );
    input.value = formattedValue;
}

function atualizarSimboloMoeda() {
    const paisSelecionado = document.getElementById('pais-contratante').value;
    codigoMoeda = obterCodigoMoedaDoPais(paisSelecionado);

    const camposDinheiro = document.querySelectorAll('[name="custo-obra"], [name="valor-contrato"]');
    camposDinheiro.forEach((campo) => {
        formatarDinheiro(campo);
    });
}

function obterCodigoMoedaDoPais(pais) {
    const codigoMoedaPorPais = {
        ZA: 'ZAR', // África do Sul
        DE: 'EUR', // Alemanha
        AO: 'AOA', // Angola
        SA: 'SAR', // Arábia Saudita
        AR: 'ARS', // Argentina
        AM: 'AMD', // Armênia
        AU: 'AUD', // Austrália
        AT: 'EUR', // Áustria
        // Adicione outros códigos de moeda para países aqui
        // Exemplo: 'BR': 'BRL' para o Brasil, 'US': 'USD' para os Estados Unidos, etc.
        BR: 'BRL', // Brasil
        BS: 'BSD', // Bahamas
        BH: 'BHD', // Bahrein
        BB: 'BBD', // Barbados
        BE: 'EUR', // Bélgica
        BJ: 'XOF', // Benin
        BO: 'BOB', // Bolívia
        BA: 'BAM', // Bósnia e Herzegovina
        BG: 'BGN', // Bulgária
        CV: 'CVE', // Cabo Verde
        CM: 'XAF', // Camarões
        KH: 'KHR', // Camboja
        CA: 'CAD', // Canadá
        CL: 'CLP', // Chile
        CY: 'EUR', // Chipre
        CO: 'COP', // Colômbia
        CD: 'CDF', // Congo
        KP: 'KPW', // Coreia do Norte
        KR: 'KRW', // Coreia do Sul
        CI: 'XOF', // Costa do Marfim
        CR: 'CRC', // Costa Rica
        HR: 'HRK', // Croácia
        CU: 'CUP', // Cuba
        CW: 'ANG', // Curaçao
        DK: 'DKK', // Dinamarca
        EG: 'EGP', // Egito
        SV: 'USD', // El Salvador
        EC: 'USD', // Equador
        SI: 'EUR', // Eslovênia
        ES: 'EUR', // Espanha
        US: 'USD', // Estados Unidos da América
        EE: 'EUR', // Estônia
        ET: 'ETB', // Etiópia
        PH: 'PHP', // Filipinas
        FI: 'EUR', // Finlândia
        GM: 'GMD', // Gâmbia
        GH: 'GHS', // Gana
        GB: 'GBP', // Grã-Bretanha
        GD: 'XCD', // Granada
        GR: 'EUR', // Grécia
        GT: 'GTQ', // Guatemala
        GY: 'GYD', // Guiana
        GN: 'GNF', // Guiné
        GW: 'XOF', // Guiné-Bissau
        HT: 'HTG', // Haiti
        NL: 'EUR', // Holanda
        HN: 'HNL', // Honduras
        HK: 'HKD', // Hong Kong
        HU: 'HUF', // Hungria
        VG: 'USD', // Ilhas Virgens Britânicas
        IN: 'INR', // Índia
        ID: 'IDR', // Indonésia
        GB: 'GBP', // Inglaterra
        IQ: 'IQD', // Iraque
        IS: 'ISK', // Islândia
        IL: 'ILS', // Israel
        IT: 'EUR', // Itália
        JP: 'JPY', // Japão
        JO: 'JOD', // Jordânia
        KW: 'KWD', // Kuwait
        LA: 'LAK', // Laos
        LB: 'LBP', // Líbano
        LY: 'LYD', // Líbia
        LI: 'CHF', // Liechtenstein
        LT: 'EUR', // Lituânia
        LU: 'EUR', // Luxemburgo
        MG: 'MGA', // Madagascar
        MY: 'MYR', // Malásia
        MW: 'MWK', // Malawi
        MT: 'EUR', // Malta
        MA: 'MAD', // Marrocos
        MU: 'MUR', // Maurício
        MX: 'MXN', // México
        MZ: 'MZN', // Moçambique
        MD: 'MDL', // Moldávia
        NI: 'NIO', // Nicarágua
        NG: 'NGN', // Nigéria
        NO: 'NOK', // Noruega
        NZ: 'NZD', // Nova Zelândia
        PS: 'ILS', // Palestina
        PA: 'PAB', // Panamá
        PG: 'PGK', // Papua-Nova Guiné
        PK: 'PKR', // Paquistão
        PY: 'PYG', // Paraguai
        PE: 'PEN', // Peru
        PL: 'PLN', // Polônia
        PT: 'EUR', // Portugal
        AD: 'EUR', // Principado de Andorra
        MC: 'EUR', // Principado de Mônaco
        KE: 'KES', // Quênia
        DZ: 'DZD', // República Democrática e Popular da Argélia
        CF: 'XAF', // República Centro-Africana
        IE: 'EUR', // República da Irlanda
        DO: 'DOP', // República Dominicana
        CN: 'CNY', // República Popular da China
        AO: 'AOA', // República Popular de Angola
        RO: 'RON', // Romênia
        RU: 'RUB', // Rússia
        WS: 'WST', // Samoa Ocidental
        ST: 'STN', // São Tomé e Príncipe
        SN: 'XOF', // Senegal
        SL: 'SLL', // Serra Leoa
        RS: 'RSD', // Sérvia
        SY: 'SYP', // Síria
        SO: 'SOS', // Somália
        SZ: 'SZL', // Eswatini (Suazilândia)
        SE: 'SEK', // Suécia
        CH: 'CHF', // Suíça
        SR: 'SRD', // Suriname
        TH: 'THB', // Tailândia
        TW: 'TWD', // Taiwan (República da China)
        TG: 'XOF', // Togo
        TT: 'TTD', // Trinidad e Tobago
        TN: 'TND', // Tunísia
        TR: 'TRY', // Turquia
        UA: 'UAH', // Ucrânia
        UY: 'UYU', // Uruguai
        VA: 'EUR', // Vaticano
        VE: 'VES', // Venezuela
        VN: 'VND', // Vietnã
        ZW: 'ZWL', // Zimbábue
    };
    return codigoMoedaPorPais[pais] || 'BRL'; // Retorna o código de moeda mapeado ou 'BRL' como padrão
}

document.getElementById('custo-obra').addEventListener('input', function () {
    formatarDinheiro(this);
});

document.getElementById('valor-contrato').addEventListener('input', function () {
    formatarDinheiro(this);
});




// -----------BOTÕES PARA VOLTAR E AVANÇAR - FORMULÁRIO -------------
// Função para avançar para a próxima etapa
function avancarParaProximaEtapa(etapaAtual, etapaSeguinte) {
    // Esconde a etapa atual e mostra a etapa seguinte
    etapaAtual.classList.remove('atual');
    etapaSeguinte.classList.add('atual');
}

// Função para voltar para a etapa anterior
function voltarParaEtapaAnterior(etapaAtual, etapaAnterior) {
    // Esconde a etapa atual e mostra a etapa anterior
    etapaAtual.classList.remove('atual');
    etapaAnterior.classList.add('atual');
}

// Função para avançar ou voltar para a próxima etapa
function navegarEntreEtapas(event) {
    const botao = event.target;
    const etapaAtualId = botao.getAttribute('data-etapa-atual');
    const etapaSeguinteId = botao.getAttribute('data-etapa-seguinte');
    const etapaAtual = document.getElementById(etapaAtualId);
    const etapaSeguinte = document.getElementById(etapaSeguinteId);

    if (botao.classList.contains('botao-avancar')) {
        avancarParaProximaEtapa(etapaAtual, etapaSeguinte);
    } else {
        voltarParaEtapaAnterior(etapaAtual, etapaSeguinte);
    }
}

// Associando o evento de clique a todos os botões de voltar e avançar
const botoesAvancarVoltar = document.querySelectorAll('.botao-avancar, .botao-voltar');
botoesAvancarVoltar.forEach(botao => {
    botao.addEventListener('click', navegarEntreEtapas);
});

// Chamada inicial para garantir que apenas a primeira etapa seja visível no carregamento da página
document.getElementById('etapa1').classList.add('atual');
document.getElementById('etapa2').classList.remove('atual');
document.getElementById('etapa3').classList.remove('atual');
document.getElementById('etapa4').classList.remove('atual');
document.getElementById('etapa5').classList.remove('atual');







