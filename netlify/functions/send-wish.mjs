export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Nepodporovaná metoda." }), {
      status: 405, headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { email, wish, website } = await req.json();

    // Tichá ochrana proti jednoduchým automatickým spamovým odesláním.
    if (website) return new Response(JSON.stringify({ ok: true }), { status: 200 });
    if (typeof email !== "string" || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Zkontroluj prosím e-mailovou adresu." }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }
    if (typeof wish !== "string" || !wish.trim() || wish.length > 5000) {
      return new Response(JSON.stringify({ error: "Napiš prosím své přání (max. 5000 znaků)." }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = Netlify.env.get("RESEND_API_KEY");
    const from = Netlify.env.get("RESEND_FROM_EMAIL");
    if (!apiKey || !from) {
      return new Response(JSON.stringify({ error: "Odesílání ještě není nastavené. Správce webu musí doplnit e-mailovou službu." }), {
        status: 503, headers: { "Content-Type": "application/json" }
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [email.trim()],
        subject: "🎄 Tvoje vánoční přání",
        text: `Ahoj!\n\nTady je tvoje vánoční přání:\n\n${wish.trim()}\n\nKrásné Vánoce!`
      })
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "E-mailová služba zprávu nepřijala. Zkontroluj nastavení odesílací adresy." }), {
        status: 502, headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ error: "Nepodařilo se zpracovat formulář." }), {
      status: 400, headers: { "Content-Type": "application/json" }
    });
  }
};
