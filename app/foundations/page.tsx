const colors = [
  ["Canvas", "--canvas", "oklch(0.968 0.012 75)", "swatch-canvas"],
  ["Surface", "--surface", "oklch(0.992 0.005 75)", "swatch-surface"],
  ["Ink", "--ink", "oklch(0.235 0.016 48)", "swatch-ink"],
  ["Terracotta", "--accent", "oklch(0.58 0.145 38)", "swatch-accent"],
  ["Moss", "--success", "oklch(0.55 0.12 145)", "swatch-moss"],
  ["Focus blue", "--focus", "oklch(0.58 0.16 245)", "swatch-focus"],
];

export default function FoundationsPage() {
  return (
    <main className="docs-route foundations-route">
      <header className="route-hero reveal-in">
        <p className="section-index">FOUNDATIONS / THE VISUAL GRAMMAR</p>
        <h1>Warmth with<br/><i>working rules.</i></h1>
        <p>A complete semantic foundation for color, typography, shape, spacing, elevation, and motion—designed to stay expressive under real product pressure.</p>
      </header>

      <section className="foundation-section reveal-in delay-1">
        <div className="foundation-label"><span>01</span><h2>Color</h2><p>Warm neutrals carry the product. Terracotta marks intent; secondary colors communicate state and data.</p></div>
        <div className="color-system">
          <div className="color-spectral"><span>WARM LIGHT</span><div/><span>WARM DARK</span></div>
          <div className="swatch-grid">{colors.map(([name, token, value, cls]) => <article key={name}><div className={`swatch ${cls}`}/><h3>{name}</h3><code>{token}</code><small>{value}</small></article>)}</div>
        </div>
      </section>

      <section className="foundation-section type-section">
        <div className="foundation-label"><span>02</span><h2>Typography</h2><p>Serif for editorial authority, sans for clear work, mono for system state and code.</p></div>
        <div className="type-specimen">
          <article className="type-display"><span>DISPLAY / FRAUNCES 420</span><p>Thoughtful software<br/><i>has a point of view.</i></p><small>72 / 66 · −4% tracking</small></article>
          <article className="type-body"><span>INTERFACE / GEIST</span><h3>Content has visual authority.</h3><p>Typography, spacing, and hierarchy should carry the design. Decorative containers remain secondary, and controls stay quiet until they are needed.</p><small>16 / 26 · readable measure 64ch</small></article>
          <article className="type-mono"><span>METADATA / IBM PLEX MONO</span><code>STATUS: STABLE<br/>BUILD: 0.1.0<br/>CONTRAST: AA<br/>MOTION: REDUCED</code></article>
        </div>
      </section>

      <section className="foundation-section shape-section">
        <div className="foundation-label"><span>03</span><h2>Shape & space</h2><p>Small radii and thin borders preserve character without turning every object into a pill or card.</p></div>
        <div className="shape-showcase">
          {["xs · 4", "sm · 6", "md · 10", "lg · 14", "xl · 20"].map((item, index) => <article key={item} style={{borderRadius:`${[4,6,10,14,20][index]}px`}}><span>{item}</span></article>)}
          <div className="space-ruler"><i style={{width:"8px"}}/><i style={{width:"16px"}}/><i style={{width:"24px"}}/><i style={{width:"40px"}}/><i style={{width:"64px"}}/></div>
        </div>
      </section>

      <section className="foundation-section motion-section">
        <div className="foundation-label"><span>04</span><h2>Motion</h2><p>Movement explains continuity, change, and hierarchy. Hover the specimens to replay them.</p></div>
        <div className="motion-grid">
          {["enter-soft", "reveal-line", "shift-active", "expand-panel", "press-control", "swap-content"].map((item, index) => <article key={item} className={`motion-${index + 1}`}><div><span>{index + 1}</span></div><code>{item}</code><small>{index < 2 ? "160ms" : index < 4 ? "220ms" : "140ms"}</small></article>)}
        </div>
      </section>

      <section className="token-marquee" aria-label="Design token examples"><div>--canvas · --surface · --ink · --accent · --border · --radius-md · --duration-base · --ease-enter · --measure-prose · --focus</div></section>
    </main>
  );
}
