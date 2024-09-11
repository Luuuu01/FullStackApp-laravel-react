# Receptorijum

Receptorijum je full-stack aplikacija koja omogućava korisnicima da pretražuju, kreiraju i upravljaju receptima. Korisnici mogu registrovati naloge, prijaviti se, kao i dodavati recepte u svoju korpu.

## Instalacija

Da biste instalirali sve potrebne zavisnosti, pratite sledeće korake:

1. **Frontend**

   - Idite u direktorijum frontend-a .
   - Pokrenite komandu za instalaciju zavisnosti:
     ```bash
     npm install
     ```

2. **Backend**
   - Idite u direktorijum backend-a (`cd backend`).
   - Pokrenite komandu za instalaciju zavisnosti:
     ```bash
     composer install
     ```

## Pokretanje aplikacije

Nakon što ste instalirali sve zavisnosti, možete pokrenuti aplikaciju:

1. **Pokretanje Backend-a**

   - U direktorijumu backend-a, pokrenite:
     ```bash
     php artisan serve
     ```
   - Backend će biti dostupan na `http://localhost:8000`.

2. **Pokretanje Frontend-a**
   - U direktorijumu frontend-a, pokrenite:
     ```bash
     npm start
     ```
   - Frontend će biti dostupan na `http://localhost:3000`.

## Osnovne funkcionalnosti

- **Prijava i Registracija**: Korisnici se mogu registrovati i prijaviti se na sistem.
- **Pregled Recepata**: Korisnici mogu pregledati listu dostupnih recepata.
- **Filtriranje Recepata**: Korisnici mogu filtrirati recepte prema stikliranim sastojcima.
- **Kreiranje Recepata**: Registrovani korisnici mogu kreirati i dodavati svoje recepte.
- **Korpa**: Korisnici mogu dodavati recepte u svoju korpu i upravljati stavkama u korpi.

## Link ka GitHub Repozitorijumu

[GitHub Repo] https://github.com/elab-development/internet-tehnologije-projekat-app
