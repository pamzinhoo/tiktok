import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'motion/react';
import GooeyNav from './components/reactbits/GooeyNav';
import MaskedHeading from './components/reactbits/MaskedHeading';
import ScrollVelocity from './components/reactbits/ScrollVelocity';
import ShapeGrid from './components/reactbits/ShapeGrid';
import './styles.css';

const navItems = [
  { label: 'Programa', href: '#programa' },
  { label: 'Guias', href: '#guias' },
  { label: 'Evidência', href: '#evidencia' },
  { label: 'Oferta', href: '#oferta' },
];

const guides = [
  {
    n: '01',
    title: 'Guia de Treino',
    kicker: 'TÉCNICA · PROGRESSÃO · CONSISTÊNCIA',
    desc: 'Rotina A/B/C/D para iniciantes e intermediários, com séries, repetições, RIR, descanso, cardio, progressão e orientações de execução.',
    stats: ['4 sessões-base', '45–75 min', 'RIR + progressão'],
    accent: '#b9ff66',
    cover: '/assets/capa-treino.png',
  },
  {
    n: '02',
    title: 'Alimentação & Receitas',
    kicker: '30 RECEITAS · TROCAS · ORGANIZAÇÃO',
    desc: 'Refeições acessíveis, substituições, preparo e uma estrutura prática para montar refeições sem depender de regras extremas ou de um cardápio rígido.',
    stats: ['30 receitas', 'compras e preparo', 'porções como ponto de partida'],
    accent: '#ffb55a',
    cover: '/assets/capa-alimentacao-receitas.png',
  },
  {
    n: '03',
    title: 'Guia Geral',
    kicker: 'PLANEJAR · EXECUTAR · AJUSTAR',
    desc: 'Conecta treino, alimentação e rotina em um mapa de 30 dias para transformar imprevistos em ajustes — não em abandono.',
    stats: ['4 semanas', 'revisão semanal', 'plano B'],
    accent: '#8ddcff',
    cover: '/assets/capa-guia-geral.png',
  },
];

const studies = [
  {
    code: 'PMID 28698222',
    title: 'Proteína + treino de resistência',
    text: 'Meta-análise com 49 estudos: suplementação proteica pode aumentar modestamente ganhos de massa livre de gordura e força quando combinada ao treino de resistência.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/28698222/',
  },
  {
    code: 'PMID 34192411',
    title: 'Auto-monitoramento e consistência',
    text: 'Revisão sistemática e meta-análise encontrou benefício do auto-monitoramento de dieta e atividade física em intervenções de perda de peso em adultos com sobrepeso/obesidade.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/34192411/',
  },
  {
    code: 'PMID 34412727',
    title: 'Registrar ajuda a organizar o processo',
    text: 'Revisão sistemática descreve estratégias de auto-monitoramento alimentar usadas em intervenções comportamentais de perda de peso e sua relação com adesão e resultados.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/34412727/',
  },
];

function GuideMockup({ guide, index }) {
  return (
    <motion.article
      className="guide"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      style={{ '--guide-accent': guide.accent }}
    >
      <div className="guide-cover-wrap" aria-hidden="true">
        <div className="guide-shadow" />
        <motion.img
          className="guide-cover-image"
          src={guide.cover}
          alt=""
          loading="lazy"
          initial={{ rotateY: -12, rotateZ: -2, y: 18, opacity: 0 }}
          whileInView={{ rotateY: -8, rotateZ: -1.5, y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <div className="guide-copy">
        <div className="micro">{guide.kicker}</div>
        <h3>{guide.title}</h3>
        <p>{guide.desc}</p>
        <div className="guide-stats">
          {guide.stats.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>
    </motion.article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="site" ref={rootRef}>
      <header className="topbar">
        <a className="brand" href="#top">CORTES<span>FIT</span>.BR</a>
        <div className="nav-desktop"><GooeyNav items={navItems} particleCount={8} particleDistances={[55, 8]} particleR={65} animationTime={420} timeVariance={120} /></div>
        <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menu">{menuOpen ? 'FECHAR' : 'MENU'}</button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(i => <a key={i.href} href={i.href}>{i.label}</a>)}
        </div>
      )}

      <main>
        <section className="hero" id="top">
          <div className="shape-layer" aria-hidden="true">
            <ShapeGrid direction="diagonal" speed={0.2} borderColor="rgba(211,255,168,.12)" hoverFillColor="rgba(185,255,102,.24)" squareSize={58} shape="square" hoverTrailAmount={3} />
          </div>
          <div className="hero-meta"><span>3 GUIAS + 2 BÔNUS</span><span>30 DIAS</span><span>100% DIGITAL</span></div>
          <div className="hero-copy">
            <div className="eyebrow">PROGRAMA EVOLUÇÃO 30</div>
            <h1>MENOS IMPROVISO.<br/><em>MAIS DIREÇÃO.</em></h1>
            <p>Treino, alimentação e rotina organizados em três guias que funcionam como um sistema de 30 dias — com linguagem direta, prática e sem promessa de resultado mágico.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#guias">VER OS 3 GUIAS <span>↘</span></a>
              <a className="btn btn-ghost" href="#programa">COMO FUNCIONA</a>
            </div>
          </div>
          <div className="hero-product" aria-hidden="true">
            {guides.map((g, i) => <img className={`mini-cover mini-${i+1}`} key={g.n} src={g.cover} alt="" />)}
          </div>
          <div className="hero-bottom"><span>SCROLL / DISCOVER</span></div>
        </section>

        <section className="marquee-band" aria-hidden="true">
          <ScrollVelocity texts={['TREINO · ALIMENTAÇÃO · ROTINA · CONSISTÊNCIA ·', 'PLANEJE · EXECUTE · AJUSTE · REPITA ·']} velocity={38} className="velocity-text" />
        </section>

        <section className="program-section" id="programa">
          <div className="section-label">01 / O SISTEMA</div>
          <div className="program-grid">
            <div className="program-title">
              <MaskedHeading text="30 dias para organizar o básico que realmente precisa caber na sua rotina." mediaType="image" src="/assets/masked-surface.svg" fillScale={1.18} parallax={18} drift={10} reveal="rise" duration={1.05} stagger={0.06} trigger="view" align="left" weight={760} tracking={-0.055} lineHeight={0.96} textScale={0.1} />
            </div>
            <div className="program-copy">
              <p>O <strong>Programa Evolução 30</strong> não tenta transformar cada refeição ou treino em uma regra. Os três PDFs têm funções diferentes e complementares.</p>
              <div className="logic-list">
                <div><b>01</b><span><strong>Treinar</strong> com divisão A/B/C/D, faixas de repetição, RIR e progressão controlada.</span></div>
                <div><b>02</b><span><strong>Comer</strong> com opções simples, 30 receitas, substituições e preparo que cabe na semana.</span></div>
                <div><b>03</b><span><strong>Organizar</strong> os 30 dias com prioridades, revisão semanal e plano B para imprevistos.</span></div>
              </div>
            </div>
          </div>
          <div className="weeks">
            {['Adaptação', 'Consistência', 'Progressão', 'Consolidação'].map((w, i) => (
              <div className="week" key={w}><span>SEMANA {String(i+1).padStart(2,'0')}</span><strong>{w}</strong><i>{['Aprender movimentos e testar horários.','Repetir o que funcionou e reduzir decisões.','Progredir quando técnica e recuperação permitirem.','Revisar o que vale levar para o próximo mês.'][i]}</i></div>
            ))}
          </div>
        </section>

        <section className="guides-section" id="guias">
          <div className="section-label light">02 / OS 3 PDFS</div>
          <div className="guides-head"><h2>TRÊS GUIAS.<br/>UMA ROTINA.</h2><p>Cada PDF resolve uma parte diferente do processo. Juntos, viram um sistema simples para decidir menos e executar melhor.</p></div>
          <div className="guides-list">{guides.map((g, i) => <GuideMockup guide={g} index={i} key={g.n} />)}</div>
        </section>

        <section className="split-section">
          <div className="split-pane training-pane">
            <div className="section-label">03 / TREINO</div>
            <div className="pane-number">A—D</div>
            <h2>Progressão<br/>sem pressa.</h2>
            <p>O guia propõe séries e repetições, descanso, execução, alternativas, cardio e uma regra simples: a técnica vem antes da carga.</p>
            <ul><li>2–4 RIR para quem está começando</li><li>1–3 RIR para quem já treina regularmente</li><li>Cardio leve como ferramenta, não punição</li></ul>
          </div>
          <div className="split-pane food-pane">
            <div className="section-label">04 / ALIMENTAÇÃO</div>
            <div className="pane-number">30</div>
            <h2>Receitas que<br/>cabem na vida.</h2>
            <p>O material prioriza refeições comuns, orçamento, substituições e preparo. As porções são ponto de partida — não prescrição individual.</p>
            <ul><li>30 receitas completas</li><li>proteína, carboidrato, vegetais e gorduras</li><li>organização de compras e bases prontas</li></ul>
          </div>
        </section>

        <section className="evidence-section" id="evidencia">
          <div className="section-label">05 / BASE DE EVIDÊNCIA</div>
          <div className="evidence-intro"><h2>O PDF não faz o trabalho.<br/><span>Ele organiza práticas que têm evidência.</span></h2><p>Estes estudos não validam especificamente o produto. Eles dão contexto científico a princípios usados no programa, como treino de resistência, proteína adequada e auto-monitoramento.</p></div>
          <div className="studies">
            {studies.map((s, i) => (
              <a className="study" href={s.href} target="_blank" rel="noreferrer" key={s.code}>
                <span>{String(i+1).padStart(2,'0')}</span><div><small>{s.code} · PUBMED</small><h3>{s.title}</h3><p>{s.text}</p></div><b>↗</b>
              </a>
            ))}
          </div>
        </section>

        <section className="bonus-section">
          <div className="section-label light">06 / BÔNUS</div>
          <div className="bonus-head"><h2>O sistema continua<br/>fora dos guias.</h2></div>
          <div className="bonus-grid">
            <article className="bonus-card bonus-with-cover"><img src="/assets/capa-planner-30-dias.png" alt="Capa do Planner de 30 Dias" loading="lazy"/><div className="bonus-copy"><span>BÔNUS 01</span><strong>Planner de 30 Dias</strong><p>Check-ins semanais para treino, água, sono, alimentação organizada e revisão do que funcionou.</p><i>PLANEJE / EXECUTE / AJUSTE</i></div></article>
            <article className="bonus-card bonus-with-cover"><img src="/assets/capa-mercado-semana.png" alt="Capa do Mercado da Semana" loading="lazy"/><div className="bonus-copy"><span>BÔNUS 02</span><strong>Mercado da Semana</strong><p>Roteiro de compra, preparo para 3–4 dias, kit de emergência e trocas rápidas para reduzir improviso.</p><i>COMPRE MENOS / USE MELHOR</i></div></article>
          </div>
        </section>

        <section className="offer-section" id="oferta">
          <div className="offer-copy">
            <div className="section-label">07 / ACESSO</div>
            <div className="eyebrow">CORTES FIT BR · PROGRAMA EVOLUÇÃO 30</div>
            <h2>TRÊS GUIAS.<br/>DOIS BÔNUS.<br/><em>UM PRÓXIMO PASSO.</em></h2>
            <p>Conteúdo educativo para adultos saudáveis que querem uma estrutura mais clara para treino, alimentação e rotina.</p>
            <a className="btn btn-primary btn-large" href="https://pay.cakto.com.br/35cgxc9_1120021">QUERO O PROGRAMA <span>↗</span></a>
          </div>
          <div className="offer-stack" aria-hidden="true">
            {guides.map((g, i) => <img key={g.n} className={`offer-cover ob-${i+1}`} src={g.cover} alt="" />)}
          </div>
        </section>
      </main>

      <footer>
        <div>CORTESFIT.BR · EVOLUÇÃO 30</div>
        <p>Material educativo. Não substitui avaliação ou acompanhamento individual de médico, nutricionista, profissional de Educação Física ou fisioterapeuta. Resultados variam entre pessoas.</p>
        <span>© 2026</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
