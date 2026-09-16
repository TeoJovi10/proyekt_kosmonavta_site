'use strict';

const phases = [
  {title:'Estação Krasny Mir',type:'PONTO DE PARTIDA',description:'A missão começa na estação de lançamento. É aqui que a ordem de Petrovitch se transforma na jornada de Valentina.',enemies:'Deixar a Terra',movement:'Sem movimentação livre',image:'assets/krasny_mir.png',alt:'Foguete na Estação Krasny Mir'},
  {title:'Estratosfera',type:'DEIXANDO A TERRA',description:'Os primeiros obstáculos surgem na subida. Valentina precisa atravessar gaivotas e asteroides enquanto deixa o céu terrestre para trás.',enemies:'Gaivotas e asteroides',movement:'Horizontal e vertical',image:'assets/estratosfera.png',alt:'Nave da Valentina enfrentando gaivotas na estratosfera'},
  {title:'Espaço próximo',type:'ENTRE DESTROÇOS E MÁQUINAS',description:'Um satélite quebrado, o Buran e drones cruzam a rota. Ler os padrões de cada ameaça é parte da sobrevivência.',enemies:'Satélite quebrado, Buran e drones',movement:'Horizontal e vertical',image:'assets/espaco_proximo.png',alt:'Nave da Valentina entre destroços no espaço próximo'},
  {title:'Espaço profundo',type:'EM TERRITÓRIO DESCONHECIDO',description:'Longe da Terra, a viagem fica ainda mais hostil. Novos drones, minas espaciais e até um alienígena desafiam a cosmonauta.',enemies:'Drones, minas espaciais e alienígena',movement:'Horizontal e vertical',image:'assets/espaco_profundo.png',alt:'Nave da Valentina em meio a perigos no espaço profundo'},
  {title:'Órbita de Marte',type:'CONFRONTO FINAL / BOSS FIGHT',description:'Marte está logo ali. Uma nave-mãe acompanhada por drones forma a última linha de ataque antes da chegada ao planeta vermelho.',enemies:'Nave-mãe e drones',movement:'Horizontal e vertical',image:'assets/orbit_mars.png',alt:'Nave da Valentina enfrentando drones na órbita de Marte'},
  {title:'Chegada a Marte',type:'O IMPOSSÍVEL ACONTECEU',description:'Valentina chega ao planeta vermelho. Enviada para morrer, ela transforma a missão sem esperança em uma conquista que seus comandantes não podem apagar.',enemies:'Missão concluída',movement:'Sem movimentação livre',image:'assets/jogatina.png',alt:'Tela de abertura de Proyekt Kosmonavta com Marte ao fundo'}
];
let activePhase = 0;
const phaseButtons = [...document.querySelectorAll('[data-phase]')];
function selectPhase(index) {
  activePhase = index;
  const phase = phases[index];
  document.querySelector('#phase-title').textContent = phase.title;
  document.querySelector('#phase-type').textContent = phase.type;
  document.querySelector('#phase-description').textContent = phase.description;
  document.querySelector('#phase-enemies').textContent = `DESAFIO / ${phase.enemies}`;
  document.querySelector('#phase-movement').textContent = `MOVIMENTO / ${phase.movement}`;
  document.querySelector('#phase-count').textContent = `${String(index + 1).padStart(2,'0')} / 06`;
  const phaseImage = document.querySelector('#phase-image');
  phaseImage.src = phase.image;
  phaseImage.alt = phase.alt;
  const next = document.querySelector('#next-phase');
  next.textContent = index === 5 ? 'VOLTAR AO INÍCIO →' : 'PRÓXIMA ETAPA →';
  next.setAttribute('aria-label', index === 5 ? 'Voltar à primeira etapa' : 'Explorar próxima etapa');
  phaseButtons.forEach((button,i) => button.setAttribute('aria-pressed',String(i === index)));
}
phaseButtons.forEach(button => button.addEventListener('click',() => selectPhase(Number(button.dataset.phase))));
document.querySelector('#next-phase').addEventListener('click',() => selectPhase((activePhase + 1) % phases.length));

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded','false'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click',() => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded',String(open)); navigation.classList.toggle('is-open',open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event => { if(event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {closeMenu();menuButton.focus();} });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion-toggle');
function setMotion(paused) {
  document.documentElement.classList.toggle('motion-paused',paused);
  motionButton.setAttribute('aria-pressed',String(paused));
  motionButton.textContent = paused ? 'Ativar animações' : 'Pausar animações';
}
setMotion(reducedMotion.matches);
reducedMotion.addEventListener('change',event => setMotion(event.matches));
motionButton.addEventListener('click',() => setMotion(motionButton.getAttribute('aria-pressed') !== 'true'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:0.08});
  document.querySelectorAll('.story-grid,.section-heading,.game-grid,.phase-panel,.scientist,.collective').forEach(element => {element.classList.add('reveal');observer.observe(element);});
}
