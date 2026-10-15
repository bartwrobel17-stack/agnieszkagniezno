# Agnieszka Studio Fryzjerskie

Premiumowa strona salonu fryzjerskiego przy ul. Świętego Michała 12 w Gnieźnie. Projekt wykorzystuje Next.js App Router, React, TypeScript i Tailwind CSS 4.

## Wymagania

- Node.js 20.9 lub nowszy
- npm
- Projekt Supabase (potrzebny do uruchomienia rezerwacji, kont i danych produkcyjnych)

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env.local
npm run dev
``

Otwórz http://localhost:3000. Strona publiczna działa bez Supabase. Formularz rezerwacji jest obecnie wyłącznie demonstracyjny i jawnie informuje, że nie wysyła rezerwacji. Nie traktuj go jako aktywnego systemu rezerwacyjnego.

## Kontrole jakości

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Supabase

1. Utwórz projekt w Supabase.
2. Ustaw `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` w środowisku.
3. Uruchom migracje SQL z katalogu `supabase/migrations` w kolejności nazw.
4. Skonfiguruj uwierzytelnianie e-mail oraz przekierowania dla domen lokalnych i produkcyjnej.
5. Wartości service role i sekrety dostawców przechowuj wyłącznie po stronie serwera. Nigdy nie dodawaj ich do zmiennych `NEXT_PUBLIC_*` ani repozytorium.

Schemat bazy to początek architektury wielosalonowej. Przed włączeniem publicznych rezerwacji należy dodać i przetestować serwerowe RPC do atomowego tworzenia wizyt, rzeczywiste sprawdzanie dostępności, limity żądań i potwierdzenia e-mail. Sam formularz na stronie nie blokuje terminów.

## Wdrożenie na Vercel

1. Zaimportuj repozytorium `bartwrobel17-stack/agnieszkagniezno` w Vercel.
2. Ustaw zmienne środowiskowe w ustawieniach projektu.
3. Ustaw `NEXT_PUBLIC_SITE_URL` na docelowy adres.
4. Wykonaj deploy. Vercel wykrywa Next.js automatycznie.
5. Po wdrożeniu sprawdź logi kompilacji, domenę, przekierowania Supabase i dostępność formularzy.

## Dane salonu

- Nazwa: Agnieszka, zakład fryzjerski
- Adres: Świętego Michała 12, 62-200 Gniezno
- Telefon: 61 425 87 76
- Ocena przekazana do projektu: 4,7/5 na podstawie 81 opinii

Cennik i godziny na stronie mają charakter orientacyjny i wymagają potwierdzenia przez salon. Cytowana opinia jest krótkim fragmentem informacji dostarczonej na potrzeby projektu; nie ma jeszcze połączenia z API opinii.

## Status funkcji

- [x] Oryginalna, responsywna strona salonu.
- [x] Sekcje oferty, galerii, opinii, kontaktu i CTA rezerwacji.
- [x] Demonstracyjny formularz z walidacją przeglądarkową i jasnym komunikatem o braku wysłania.
- [x] Podstawowy schemat PostgreSQL i polityki RLS.
- [ ] Produkcyjne logowanie, konta klienta i role właściciela.
- [ ] Atomowe rezerwacje i sprawdzanie dostępności.
- [ ] Płatności, e-mail, panel właściciela i panel administratora.
- [ ] Testy E2E i testy bezpieczeństwa.

Nie należy przedstawiać niezrealizowanych punktów jako aktywnych funkcji.
