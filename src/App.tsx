import { useState } from 'react';

const ADDRESS = 'Klaukkalantie 74, 01800 Klaukkala';
const PHONE = '045 1863033';
const PHONE_HREF = 'tel:+358451863033';
const EMAIL = 'ak.terminaali@gmail.com';
const FACEBOOK_URL = 'https://www.facebook.com/topwashklaukkala';
const COMPANY = 'ATMD Oy';
const BUSINESS_ID = '2470070-6';
const MAP_QUERY = encodeURIComponent(
    'Klaukkalantie 74, 01800 Klaukkala, Finland',
);

const OPEN_HOUR = 6;
const CLOSE_HOUR = 24;

// Ordered Monday-first; index matches (Date.getDay() + 6) % 7
const HOURS = [
    { day: 'Maanantai', hours: '6–24' },
    { day: 'Tiistai', hours: '6–24' },
    { day: 'Keskiviikko', hours: '6–24' },
    { day: 'Torstai', hours: '6–24' },
    { day: 'Perjantai', hours: '6–24' },
    { day: 'Lauantai', hours: '6–24', note: 'Pyhäinpäivä' },
    { day: 'Sunnuntai', hours: '6–24' },
];

const PAYMENTS = [
    { icon: '📱', title: 'Mobiilimaksu', text: 'Maksa kätevästi kännykällä.' },
    {
        icon: '💳',
        title: 'Korttimaksu',
        text: 'Kaikki yleisimmät pankki- ja luottokortit.',
    },
    {
        icon: '⭐',
        title: 'Kanta-asiakaskortti',
        text: 'Edullisemmat pesut vakioasiakkaille.',
    },
];

const NAV_LINKS = [
    { href: '#palvelut', label: 'Palvelut' },
    { href: '#aukioloajat', label: 'Aukioloajat' },
    { href: '#yhteystiedot', label: 'Yhteystiedot' },
];

function isOpenNow(date: Date) {
    const hour = date.getHours();
    return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="container navbar-inner">
                <a
                    href="#top"
                    className="brand"
                    onClick={() => setMenuOpen(false)}
                >
                    <img
                        src="/imgs/topwash-logo.jpg"
                        alt=""
                        className="brand-logo"
                    />
                    <span>TopWash</span>
                </a>
                <button
                    type="button"
                    className="menu-toggle"
                    aria-expanded={menuOpen}
                    aria-controls="main-nav"
                    aria-label="Valikko"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <nav id="main-nav" className={menuOpen ? 'nav open' : 'nav'}>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href={PHONE_HREF} className="nav-cta">
                        Soita {PHONE}
                    </a>
                </nav>
            </div>
        </header>
    );
}

function Hero() {
    const open = isOpenNow(new Date());

    return (
        <section className="hero" id="top">
            <div className="container hero-content">
                <span className={open ? 'status open' : 'status closed'}>
                    <span className="status-dot" />
                    {open ? 'Avoinna nyt' : 'Suljettu'} · joka päivä 6–24
                </span>
                <h1>
                    Automaattipesula <span>Klaukkalassa</span>
                </h1>
                <p>
                    Nopea ja helppo autopesu – ajat sisään, me hoidamme loput.
                </p>
                <div className="hero-actions">
                    <a href="#yhteystiedot" className="btn btn-primary">
                        Ajo-ohjeet
                    </a>
                    <a href="#aukioloajat" className="btn btn-outline">
                        Aukioloajat
                    </a>
                </div>
            </div>
        </section>
    );
}

function Services() {
    return (
        <section className="section" id="palvelut">
            <div className="container">
                <h2 className="section-title">Automaattipesula</h2>
                <p className="section-lead">
                    Pesuhallimme palvelee sinua joka päivä aamukuudesta
                    keskiyöhön. Valitse sinulle sopivin maksutapa.
                </p>
                <div className="cards">
                    {PAYMENTS.map((p) => (
                        <div key={p.title} className="card">
                            <div className="card-icon" aria-hidden="true">
                                {p.icon}
                            </div>
                            <h3>{p.title}</h3>
                            <p>{p.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Hours() {
    const todayIndex = (new Date().getDay() + 6) % 7;

    return (
        <section className="section section-blue" id="aukioloajat">
            <div className="container hours-layout">
                <div>
                    <h2 className="section-title">Aukioloajat</h2>
                    <p className="section-lead">
                        Olemme avoinna joka päivä klo 6–24, myös
                        viikonloppuisin.
                    </p>
                    <p className="hours-note">Aukioloajat voivat vaihdella.</p>
                </div>
                <ul className="hours-list">
                    {HOURS.map((h, i) => (
                        <li
                            key={h.day}
                            className={i === todayIndex ? 'today' : undefined}
                        >
                            <span>
                                {h.day}
                                {h.note && <small>{h.note}</small>}
                            </span>
                            <strong>{h.hours}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function Contact() {
    return (
        <section className="section" id="yhteystiedot">
            <div className="container contact-layout">
                <div>
                    <h2 className="section-title">Yhteystiedot</h2>
                    <p className="section-lead">TopWash Klaukkala</p>
                    <ul className="contact-list">
                        <li>
                            <span className="contact-label">Osoite</span>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {ADDRESS}
                            </a>
                        </li>
                        <li>
                            <span className="contact-label">Puhelin</span>
                            <a href={PHONE_HREF}>{PHONE}</a>
                        </li>
                        <li>
                            <span className="contact-label">Sähköposti</span>
                            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        </li>
                        <li>
                            <span className="contact-label">Facebook</span>
                            <a
                                href={FACEBOOK_URL}
                                target="_blank"
                                rel="noreferrer"
                            >
                                facebook.com/topwashklaukkala
                            </a>
                        </li>
                    </ul>
                </div>
                <iframe
                    className="map"
                    title="TopWash Klaukkala kartalla"
                    src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <span>© {new Date().getFullYear()} TopWash Klaukkala</span>
                <span>
                    {COMPANY} · Y-tunnus {BUSINESS_ID}
                </span>
                <span>{ADDRESS}</span>
                <a href={PHONE_HREF}>{PHONE}</a>
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                    Facebook
                </a>
            </div>
        </footer>
    );
}

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Services />
                <Hours />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;
