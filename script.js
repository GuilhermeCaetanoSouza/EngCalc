// CONTROLE DE ABRIR/FECHAR CALCULADORAS
document.querySelectorAll('.btn-abrir').forEach(btn => {
    btn.addEventListener('click', () => {
        const modulo = btn.getAttribute('data-modulo');
        const calcDiv = document.getElementById(`calc-${modulo}`);
        if (calcDiv.classList.contains('hidden')) {
            calcDiv.classList.remove('hidden');
            btn.textContent = btn.textContent.replace('Abrir', 'Fechar');
        } else {
            calcDiv.classList.add('hidden');
            btn.textContent = btn.textContent.replace('Fechar', 'Abrir');
        }
    });
});

// GERENCIAMENTO DE ABAS (dentro de cada calculadora)
document.querySelectorAll('.calc-tabs').forEach(tabContainer => {
    const btns = tabContainer.querySelectorAll('.tab-btn');
    const parent = tabContainer.closest('.calculadora');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            // desativa todos os btns e conteúdos do mesmo parent
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            parent.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            const activeContent = parent.querySelector(`#tab-${tabId}`);
            if (activeContent) activeContent.classList.remove('hidden');
        });
    });
});

// ========== FLUIDOS ==========
// Vazão
document.getElementById('calcVazaoBtn')?.addEventListener('click', () => {
    const A = parseFloat(document.getElementById('area').value) || 0;
    const v = parseFloat(document.getElementById('velocidade').value) || 0;
    const rho = parseFloat(document.getElementById('densidade').value) || 0;
    const Q = A * v;
    const Qm = rho * Q;
    document.querySelector('#resultadoVazao span:first-child').innerText = Q.toFixed(6);
    document.querySelector('#resultadoVazao span:last-child').innerText = Qm.toFixed(6);
});
// Bernoulli
document.getElementById('calcBernoulliBtn')?.addEventListener('click', () => {
    const P1 = parseFloat(document.getElementById('p1').value) || 0;
    const v1 = parseFloat(document.getElementById('v1').value) || 0;
    const z1 = parseFloat(document.getElementById('z1').value) || 0;
    const P2 = parseFloat(document.getElementById('p2').value) || 0;
    const z2 = parseFloat(document.getElementById('z2').value) || 0;
    const rho = 1000, g = 9.81;
    let left = P1 + 0.5 * rho * v1**2 + rho * g * z1;
    let rightCte = P2 + rho * g * z2;
    let kinetic = left - rightCte;
    if (kinetic < 0) {
        document.querySelector('#resultadoBernoulli span').innerText = "Impossível (perda de energia)";
        return;
    }
    let v2 = Math.sqrt((2 * kinetic) / rho);
    document.querySelector('#resultadoBernoulli span').innerText = v2.toFixed(3) + " m/s";
});

// ========== ELETRICIDADE ==========
// Ohm
document.getElementById('calcOhmBtn')?.addEventListener('click', () => {
    const V = parseFloat(document.getElementById('tensao').value) || 0;
    const R = parseFloat(document.getElementById('resistencia').value) || 0;
    if (R === 0) { alert("Resistência não pode ser zero"); return; }
    const I = V / R;
    const P = V * I;
    const spans = document.querySelectorAll('#resultadoOhm span');
    spans[0].innerText = I.toFixed(4);
    spans[1].innerText = P.toFixed(4);
});
// Queda de tensão
document.getElementById('calcQuedaBtn')?.addEventListener('click', () => {
    let I = parseFloat(document.getElementById('correnteQueda').value) || 0;
    let L = parseFloat(document.getElementById('comprimento').value) || 0;
    let S = parseFloat(document.getElementById('secao').value) || 0;
    let material = document.getElementById('material').value;
    let rho = material === 'cobre' ? 0.0172 : 0.0282;
    if (S <= 0) { alert("Seção inválida"); return; }
    let R = rho * (2 * L) / S;
    let queda = I * R;
    let perc = (queda / 127) * 100;
    const spans = document.querySelectorAll('#resultadoQueda span');
    spans[0].innerText = queda.toFixed(2);
    spans[1].innerText = perc.toFixed(2);
});

// ========== ÂNGULOS ==========
document.getElementById('calcAngulosBtn')?.addEventListener('click', () => {
    let val = parseFloat(document.getElementById('anguloValor').value) || 0;
    let unidade = document.getElementById('unidadeEntrada').value;
    let graus = 0;
    if (unidade === 'deg') graus = val;
    else if (unidade === 'rad') graus = val * (180 / Math.PI);
    else if (unidade === 'grad') graus = val * 0.9;
    let rad = graus * Math.PI / 180;
    let grad = graus / 0.9;
    document.getElementById('grausRes').innerText = graus.toFixed(5);
    document.getElementById('radRes').innerText = rad.toFixed(6);
    document.getElementById('gradRes').innerText = grad.toFixed(5);
    document.getElementById('senRes').innerText = Math.sin(rad).toFixed(6);
    document.getElementById('cosRes').innerText = Math.cos(rad).toFixed(6);
    document.getElementById('tanRes').innerText = Math.tan(rad).toFixed(6);
});

// ========== DILATAÇÃO ==========
document.getElementById('calcDilatacaoBtn')?.addEventListener('click', () => {
    let L0 = parseFloat(document.getElementById('L0').value) || 0;
    let dT = parseFloat(document.getElementById('deltaT').value) || 0;
    let alfa = parseFloat(document.getElementById('alfa').value) || 0;
    let deltaL = L0 * (alfa * 1e-6) * dT;
    let Lfinal = L0 + deltaL;
    const spans = document.querySelectorAll('#resultadoDilatacao span');
    spans[0].innerText = (deltaL * 1000).toFixed(4);
    spans[1].innerText = (Lfinal * 1000).toFixed(2);
});

// Inicializa com valores padrão (já visíveis nos inputs)
// Dispara cálculos iniciais automaticamente para mostrar algo
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calcVazaoBtn')?.click();
    document.getElementById('calcBernoulliBtn')?.click();
    document.getElementById('calcOhmBtn')?.click();
    document.getElementById('calcQuedaBtn')?.click();
    document.getElementById('calcAngulosBtn')?.click();
    document.getElementById('calcDilatacaoBtn')?.click();
});