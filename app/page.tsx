"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Instagram, MapPin, Menu, Phone, Scissors, Star, X } from "lucide-react";

const services = [
  { n: "01", name: "Strzyżenie damskie", detail: "Konsultacja, strzyżenie i modelowanie", time: "45–60 min", price: "od 80 zł" },
  { n: "02", name: "Koloryzacja", detail: "Kolor dopasowany do Ciebie i Twoich włosów", time: "120–180 min", price: "od 180 zł" },
  { n: "03", name: "Balayage & refleksy", detail: "Wielowymiarowy kolor i naturalne przejścia", time: "150–210 min", price: "od 250 zł" },
  { n: "04", name: "Modelowanie", detail: "Lekkość, objętość i wykończenie", time: "30–45 min", price: "od 50 zł" },
  { n: "05", name: "Pielęgnacja włosów", detail: "Regeneracja i indywidualnie dobrany rytuał", time: "30–60 min", price: "od 70 zł" },
];
const gallery = [
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85", alt: "Naturalna fryzura z miękkimi falami", cls: "gallery-tall" },
  { src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=85", alt: "Detale koloryzacji włosów", cls: "" },
  { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=85", alt: "Wnętrze salonu fryzjerskiego", cls: "gallery-wide" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=85", alt: "Lśniące włosy po stylizacji", cls: "" },
];

export default function Home() {
  const [booking, setBooking] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [service, setService] = useState("Strzyżenie damskie");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const openBooking = (selected?: string) => { if (selected) setService(selected); setSent(false); setBooking(true); };
  const closeBooking = () => setBooking(false);
  return (
    <main>
      <div className="announcement"><span>GNIEZNO · ŚWIĘTEGO MICHAŁA 12</span><span className="announcement-right"><span className="status-dot" /> ZAPRASZAMY DO NASZEGO SALONU</span></div>
      <header className="nav">
        <a className="brand" href="#" aria-label="Agnieszka, strona główna"><span className="brand-mark">A.</span><span className="brand-copy">AGNIESZKA<small>STUDIO FRYZJERSKIE</small></span></a>
        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"} aria-label="Nawigacja główna">
          <a href="#filozofia" onClick={() => setMobileMenu(false)}>Nasza filozofia</a><a href="#oferta" onClick={() => setMobileMenu(false)}>Usługi</a><a href="#galeria" onClick={() => setMobileMenu(false)}>Galeria</a><a href="#kontakt" onClick={() => setMobileMenu(false)}>Kontakt</a>
        </nav>
        <button className="nav-cta" onClick={() => openBooking()}>Umów wizytę <ArrowUpRight size={15}/></button>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Zamknij menu" : "Otwórz menu"}>{mobileMenu ? <X/> : <Menu/>}</button>
      </header>

      <section className="hero">
        <div className="hero-image" role="img" aria-label="Portret kobiety z pięknymi, naturalnymi włosami"><div className="hero-image-note"><span>PIĘKNO W NATURALNYM WYDANIU</span><span>01 / 04</span></div></div>
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/><span>TWÓJ CZAS. TWOJE PIĘKNO.</span></div>
          <h1>Włosy, które<br/>opowiadają <em>Twoją</em><br/><em>historię.</em></h1>
          <p className="hero-lead">Dobre cięcie. Piękny kolor. Chwila tylko dla Ciebie. W kameralnej atmosferze tworzymy fryzury, w których czujesz się po prostu sobą.</p>
          <div className="hero-actions"><button className="button-dark" onClick={() => openBooking()}>Zarezerwuj termin <ArrowRight size={16}/></button><a className="text-link" href="#oferta">Poznaj ofertę <ArrowDown size={14}/></a></div>
          <div className="hero-bottom"><div className="rating"><span className="rating-stars"><Star/><Star/><Star/><Star/><Star/></span><strong>4,7/5</strong><span>na podstawie 81 opinii</span></div><span className="hero-location"><MapPin size={14}/> Gniezno, Polska</span></div>
        </div>
        <div className="hero-index">A / 01</div>
      </section>

      <div className="ticker" aria-label="Nasze specjalizacje"><div className="ticker-track"><span>STRZYŻENIE</span><i>✳</i><span>KOLORYZACJA</span><i>✳</i><span>PIELĘGNACJA</span><i>✳</i><span>TWÓJ MOMENT</span><i>✳</i><span>STRZYŻENIE</span><i>✳</i><span>KOLORYZACJA</span><i>✳</i></div></div>

      <section className="intro section-pad" id="filozofia">
        <div className="section-kicker"><span>01 / NASZA FILOZOFIA</span><span>MAŁE RYTUAŁY, WIELKA RÓŻNICA</span></div>
        <div className="intro-grid"><div><p className="overline">MIŁO CIĘ WIDZIEĆ</p><h2>To coś więcej<br/>niż <em>wizyta.</em></h2></div><div className="intro-text"><p>Wierzymy, że najlepsza fryzura to taka, która pasuje do Ciebie. Do Twojego rytmu, osobowości i codzienności.</p><p>Dlatego zaczynamy od rozmowy, słuchamy i dobieramy rozwiązania z uważnością. Bez pośpiechu. Z dbałością o każdy detal.</p><a className="text-link" href="#kontakt">Poznaj nas bliżej <ArrowRight size={15}/></a></div></div>
        <div className="intro-image-wrap"><img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=85" alt="Jasne, przytulne wnętrze salonu fryzjerskiego"/><span className="image-caption">MIEJSCE, W KTÓRYM MOŻESZ ZWOLNIĆ</span><span className="image-stamp">Twój<br/>moment.</span></div>
      </section>

      <section className="services section-pad" id="oferta">
        <div className="section-kicker"><span>02 / OFERTA</span><span>PIELĘGNACJA Z CHARAKTEREM</span></div>
        <div className="services-heading"><h2>Znajdź swój<br/><em>rytuał.</em></h2><p>Każde włosy mają swoją historię.<br/>Pomożemy Ci opowiedzieć ją na nowo.</p></div>
        <div className="service-list">{services.map(s => <article className="service-row" key={s.n}><span className="service-number">{s.n}</span><div className="service-main"><h3>{s.name}</h3><p>{s.detail}</p></div><span className="service-time"><Clock3 size={14}/>{s.time}</span><span className="service-price">{s.price}</span><button className="service-book" onClick={() => openBooking(s.name)} aria-label={"Umów usługę: " + s.name}><ArrowUpRight size={20}/></button></article>)}</div>
        <p className="price-note">Podane ceny są orientacyjne. Ostateczna cena zależy od długości i kondycji włosów, ustalana jest podczas konsultacji.</p>
      </section>

      <section className="quote-section"><div className="quote-image"></div><div className="quote-copy"><span className="quote-mark">“</span><p>Najpiękniejsza zmiana to ta, dzięki której nadal jesteś sobą. Tylko czujesz się jeszcze lepiej.</p><span className="quote-signature">Z troską o każdy kosmyk</span><div className="quote-rule"/></div></section>

      <section className="gallery-section section-pad" id="galeria"><div className="section-kicker"><span>03 / GALERIA</span><span>PIĘKNO TKWI W SZCZEGÓŁACH</span></div><div className="gallery-heading"><h2>Nasza mała<br/><em>inspiracja.</em></h2><p>Naturalne tekstury, przemyślane kolory<br/>i piękno, które nie potrzebuje filtrów.</p></div><div className="gallery-grid">{gallery.map((g,i)=><figure key={g.src} className={g.cls}><img src={g.src} alt={g.alt} loading="lazy"/><figcaption>0{i+1} <span>{g.alt}</span></figcaption></figure>)}</div></section>

      <section className="review-section"><div className="review-top"><span>04 / WASZE SŁOWA</span><span className="review-count"><Star size={14} fill="currentColor"/> 4,7 · 81 OPINII</span></div><div className="review-content"><span className="review-stars">★★★★★</span><blockquote>„Pełen profesjonalizm i bardzo miłe panie. Zawsze wychodzę z salonu zadowolona i zrelaksowana.”</blockquote><div className="review-author"><span className="review-avatar">BS</span><span><strong>Babcia Stasia</strong><small>Opinia z Google · 5/5</small></span></div><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Świętego+Michała+12+Gniezno" target="_blank" rel="noreferrer">Zobacz opinie w Google <ArrowUpRight size={15}/></a></div><span className="review-decoration">DOBRE<br/>RZECZY<br/>ZOSTAJĄ.</span></section>

      <section className="booking-banner"><div className="booking-banner-inner"><span className="overline">ZASŁUGUJESZ NA TĘ CHWILĘ</span><h2>Gotowa na małą<br/><em>wielką zmianę?</em></h2><p>Znajdź termin, który pasuje do Ciebie. Resztą zajmiemy się razem.</p><button className="button-light" onClick={() => openBooking()}>Umów swoją wizytę <ArrowRight size={16}/></button></div><div className="booking-banner-image"/></section>

      <footer id="kontakt"><div className="footer-top"><a className="brand brand-footer" href="#"><span className="brand-mark">A.</span><span className="brand-copy">AGNIESZKA<small>STUDIO FRYZJERSKIE</small></span></a><p>Twoje włosy. Twój styl.<br/>Twoja chwila.</p><a className="footer-book" href="tel:+48614258776"><Phone size={15}/> 61 425 87 76 <ArrowUpRight size={14}/></a></div><div className="footer-grid"><div><span className="footer-label">ODWIEDŹ NAS</span><p>Świętego Michała 12<br/>62-200 Gniezno</p><a className="footer-link" href="https://www.google.com/maps/dir/?api=1&destination=Świętego+Michała+12,+62-200+Gniezno" target="_blank" rel="noreferrer">Wyznacz trasę <ArrowUpRight size={13}/></a></div><div><span className="footer-label">GODZINY OTWARCIA</span><p>Poniedziałek – piątek<br/>08:00 – 18:00<br/>Sobota: po wcześniejszym umówieniu</p><small className="hours-note">Godziny wymagają potwierdzenia przez salon.</small></div><div><span className="footer-label">ZNAJDŹ NAS</span><a className="footer-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={14}/> Instagram <ArrowUpRight size={13}/></a><a className="footer-link" href="tel:+48614258776">Zadzwoń do salonu <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© 2026 AGNIESZKA STUDIO FRYZJERSKIE</span><span>STWORZONE Z UWAŻNOŚCIĄ</span><a href="mailto:kontakt@agnieszka-salon.pl">Polityka prywatności</a></div></footer>

      {booking && <div className="modal-backdrop" role="presentation" onMouseDown={e => {if(e.target===e.currentTarget) closeBooking();}}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={closeBooking} aria-label="Zamknij"><X size={20}/></button>{sent ? <div className="booking-success"><span className="success-icon"><Check size={28}/></span><span className="overline">DZIĘKUJEMY</span><h2 id="booking-title">Zróbmy miejsce<br/><em>na coś pięknego.</em></h2><p>To demonstracyjny formularz. Twoja prośba nie została wysłana do salonu. Zadzwoń pod numer 61 425 87 76, aby potwierdzić wizytę.</p><button className="button-dark" onClick={closeBooking}>Rozumiem <ArrowRight size={16}/></button></div> : <><span className="overline">ZAREZERWUJ SWOJĄ CHWILĘ</span><h2 id="booking-title">Umów <em>wizytę.</em></h2><p className="modal-intro">Wybierz usługę i dogodny termin. Na razie formularz ma charakter poglądowy.</p><form onSubmit={e=>{e.preventDefault();setSent(true);}}><label>Wybierz usługę<select value={service} onChange={e=>setService(e.target.value)}>{services.map(s=><option key={s.n}>{s.name}</option>)}</select></label><div className="form-row"><label>Preferowany dzień<input required type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={e=>setDate(e.target.value)}/></label><label>Godzina<select required value={time} onChange={e=>setTime(e.target.value)}><option value="">Wybierz</option>{["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"].map(t=><option key={t}>{t}</option>)}</select></label></div><label>Imię i nazwisko<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Jak mamy się do Ciebie zwracać?"/></label><label>Numer telefonu<input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+48 000 000 000"/></label><button className="button-dark modal-submit" type="submit">Wyślij prośbę <ArrowRight size={16}/></button><p className="modal-disclaimer">Wysłanie formularza nie rezerwuje terminu. Potwierdź wizytę telefonicznie.</p></form></>}</section></div>}
    </main>
  );
}
