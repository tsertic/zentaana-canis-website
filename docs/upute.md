# Zentaana Canis — Upute za upravljanje stranicom

## Pristup CMS-u

Otvorite u pregledniku:

```
https://vasa-domena.com/studio
```

Prijavite se sa svojim Sanity računom.

---

## Navigacija u CMS-u

Na lijevoj strani vidite meni:

- ⚙️ **Postavke stranice** — Osnovne informacije o uzgajivačnici
- 🐕 **Psi** — Svi psi, filtrirani po spolu i statusu
- 🐾 **Legla** — Sva legla, filtrirana po statusu
- 📰 **Novosti** — Vijesti i objave
- 📸 **Galerija** — Foto albumi

---

## Dodavanje novog psa

1. Kliknite **Psi** → **Svi psi** → **+** gumb (gore desno)
2. Popunite tabove:

### Osnovni podaci

- **Ime psa** — obavezno
- **Slug** — kliknite "Generate" da se automatski popuni
- **Spol** — mužjak ili ženka
- **Pasmina, datum rođenja, boja**
- **Status** — Aktivan / Umirovljen / In memoriam
- **Rasplodni pas** — označite ako je u rasplodu
- **Istaknut na početnoj** — označite ako želite da se prikazuje na početnoj stranici

### Slike

- **Glavna slika** — prikazuje se u listi i na profilu
- **Galerija** — dodatne slike za profil psa

### Zdravlje

- Dodajte zdravstvene testove: naziv, rezultat, datum
- Možete priložiti certifikat (PDF ili slika)

### Nagrade

- Dodajte nagrade: titula, izložba, sudac, datum, lokacija
- Možete dodati fotografiju s izložbe

### Opis

- **Biografija HR / EN** — detaljni opis psa (rich text, možete formatirati tekst i dodavati slike)
- **Kratki opis HR / EN** — prikazuje se na kartici u listi

### Rodovnik

- **Otac / Majka** — odaberite iz postojećih pasa
- **Vanjski rodovnik** — za pretke koji nisu u sustavu

3. Kliknite **Publish** (zeleni gumb dolje desno)

---

## Dodavanje novog legla

1. Kliknite **Legla** → **Sva legla** → **+**
2. Popunite:

### Osnovni podaci

- **Naziv legla HR / EN** — npr. "A leglo", "B leglo"
- **Slug** — generirajte
- **Status**: Planirano → Očekujemo → Rođeni → Dostupni → Zatvoreno
- **Otac / Majka** — odaberite iz pasa
- **Datum rođenja** ili **očekivani datum**
- **Istaknut na početnoj** — za prikaz na početnoj

### Štenad

- Kliknite **Add item** za svakog šteneta
- Popunite: ime, spol, boja, status (dostupan/rezerviran/prodan/ostaje)
- Dodajte fotografiju
- Ako štene ostaje u uzgoju, povežite ga s profilom psa

### Slike

- Glavna slika legla
- Galerija — možete označiti tjedan starosti za svaku sliku

3. **Publish**

### Ažuriranje statusa

Kako leglo napreduje, mijenjajte status:

- `Planirano` — najava legla
- `Očekujemo` — ženka je skotna
- `Rođeni` — štenad su rođena
- `Dostupni` — štenad su spremni za prodaju
- `Zatvoreno` — svi štenad su prodani/raspoređeni

---

## Dodavanje novosti

1. Kliknite **Novosti** → **Sve novosti** → **+**
2. Popunite:

- **Naslov HR / EN**
- **Slug** — generirajte
- **Kategorija** — Izložbe, Legla, Rezultati, Zdravlje, Općenito
- **Datum objave**
- **Kratki opis HR / EN** — prikazuje se u listi
- **Tekst HR / EN** — potpuni sadržaj (rich text)
- **Glavna slika** + opcijalno dodatne slike
- **Povezani psi / leglo** — opcijalno za linkove na dnu članka
- **Istaknut na početnoj**

3. **Publish**

---

## Upravljanje galerijom

1. Kliknite **Galerija** → **+**
2. Popunite:

- **Naziv albuma HR / EN**
- **Slug** — generirajte
- **Kategorija** — Izložbe, Štenad, Svakodnevica, Trening, Ostalo
- **Naslovna slika** — prikazuje se u gridu galerije
- **Slike** — dodajte sve slike albuma, svaka može imati opis HR/EN
- **Datum**
- **Redoslijed** — manji broj = prikazuje se ranije

3. **Publish**

---

## Postavke stranice

Kliknite **Postavke stranice** (prikazuje se samo jedan dokument):

### Općenito

- Naziv stranice, slogan, logo

### O nama

- Tekst o uzgajivačnici (HR/EN) — prikazuje se na /o-nama stranici
- Kratki opis — prikazuje se u footeru
- Slike za O nama stranicu
- FCI broj, godina osnivanja
- Pasmine koje uzgajate

### Kontakt

- Email, telefon, adresa, grad, država
- Koordinate za mapu

### Društvene mreže

- Instagram, Facebook, YouTube, TikTok URL-ovi
- Instagram handle (bez @)

### SEO

- SEO naslov i opis (HR/EN)
- OG slika za dijeljenje na društvenim mrežama

---

## Višejezičnost

Svako tekstualno polje ima HR i EN verziju. **HR je obavezno**, EN je opcionalno. Ako EN nije popunjen, prikazat će se HR tekst na engleskoj verziji stranice.

---

## Savjeti za slike

- **Glavne slike pasa** — preporučeni omjer 3:4 (portret), min. 800x1067px
- **Slike legala** — preporučeni omjer 4:3, min. 800x600px
- **Galerija** — bilo koji omjer, min. 800px širine
- **Format** — JPG ili WebP za fotografije, PNG za grafike
- Sanity automatski optimizira slike, ne trebate ih ručno smanjivati

---

## Pomoć

Ako imate problema s CMS-om ili stranicom, kontaktirajte developera.
