VÁNOČNÍ PŘÁNÍ – NASAZENÍ NA NETLIFY

1) Rozbal ZIP.
2) Nahraj složku projektu do nového GitHub repozitáře.
3) Na Netlify zvol Add new site → Import an existing project a připoj repozitář.
   Build command nech prázdný a Publish directory nastav na ".".
   Soubor netlify.toml už nastavuje funkce.
4) Založ si účet na https://resend.com a ověř doménu, ze které bude web posílat e-maily.
   Resend obvykle vyžaduje ověřenou vlastní doménu pro odesílací adresu.
5) V Resend vytvoř API key.
6) V Netlify otevři Site configuration → Environment variables a přidej:
   RESEND_API_KEY = tvůj tajný Resend API klíč
   RESEND_FROM_EMAIL = Vánoční přání <prani@tvoje-overena-domena.cz>
   Použij adresu na doméně, kterou máš v Resend ověřenou.
7) Znovu nasaď web (Deploys → Trigger deploy).

DŮLEŽITÉ:
- API klíč vkládej pouze do Netlify Environment variables, nikdy do index.html.
- Pole na stránce určuje příjemce: přání přijde na zadaný e-mail.
- Úspěšná hláška se zobrazí až po potvrzení, že Resend e-mail přijal.
- Bez nastavení Resend a ověřené odesílací domény se e-maily neodešlou.
