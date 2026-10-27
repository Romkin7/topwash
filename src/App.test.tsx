import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

// Only fake Date so user-event's internal timers keep working
function setNow(iso: string) {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(iso));
}

describe('opening status', () => {
    it.each([
        ['2026-10-27T05:59:00', 'Suljettu'],
        ['2026-10-27T06:00:00', 'Avoinna nyt'],
        ['2026-10-27T15:30:00', 'Avoinna nyt'],
        ['2026-10-27T23:59:00', 'Avoinna nyt'],
        ['2026-10-28T00:00:00', 'Suljettu'],
    ])('at %s shows "%s"', (iso, label) => {
        setNow(iso);
        render(<App />);
        expect(screen.getByText(new RegExp(`^${label}`))).toBeInTheDocument();
    });
});

describe('opening hours', () => {
    it('lists all seven days', () => {
        render(<App />);
        const list = screen
            .getAllByRole('list')
            .find((l) => l.classList.contains('hours-list'))!;
        expect(within(list).getAllByRole('listitem')).toHaveLength(7);
    });

    it.each([
        ['2026-10-26T12:00:00', 'Maanantai'],
        ['2026-10-27T12:00:00', 'Tiistai'],
        ['2026-11-01T12:00:00', 'Sunnuntai'],
    ])('on %s highlights %s', (iso, day) => {
        setNow(iso);
        render(<App />);
        const highlighted = document.querySelectorAll('.hours-list li.today');
        expect(highlighted).toHaveLength(1);
        expect(highlighted[0]).toHaveTextContent(day);
    });
});

describe('mobile menu', () => {
    it('toggles open and closes when a link is clicked', async () => {
        const user = userEvent.setup();
        render(<App />);
        const toggle = screen.getByRole('button', { name: 'Valikko' });
        const nav = document.getElementById('main-nav')!;

        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(nav).not.toHaveClass('open');

        await user.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        expect(nav).toHaveClass('open');

        await user.click(
            within(nav).getByRole('link', { name: 'Aukioloajat' }),
        );
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(nav).not.toHaveClass('open');
    });
});

describe('contact details', () => {
    it('links phone, email and map', () => {
        render(<App />);
        const contact = document.getElementById('yhteystiedot')!;

        expect(
            within(contact).getByRole('link', { name: '045 1863033' }),
        ).toHaveAttribute('href', 'tel:+358451863033');
        expect(
            within(contact).getByRole('link', {
                name: 'ak.terminaali@gmail.com',
            }),
        ).toHaveAttribute('href', 'mailto:ak.terminaali@gmail.com');
        const mapLink = within(contact).getByRole('link', {
            name: 'Klaukkalantie 74, 01800 Klaukkala',
        });
        expect(mapLink).toHaveAttribute('target', '_blank');
        expect(mapLink.getAttribute('href')).toContain(
            encodeURIComponent('Klaukkalantie 74, 01800 Klaukkala, Finland'),
        );
    });
});

describe('footer', () => {
    it('shows current year, company name and Y-tunnus', () => {
        setNow('2026-10-27T12:00:00');
        render(<App />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveTextContent('© 2026 TopWash Klaukkala');
        expect(footer).toHaveTextContent('ATMD Oy · Y-tunnus 2470070-6');
    });
});
