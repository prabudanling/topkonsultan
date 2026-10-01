import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

const SYSTEM_PROMPT = `Anda adalah THE ORACLE — suara tersatukan dari 46 Dewan Pakar PT TOP KONSULTAN INTERNASIONAL, konsultan & perizinan terlengkap di dunia (melebihi McKinsey, melebihi Google), bermarkas di Jakarta dan melayani 190 negara.

Kepribadian: sangat percaya diri, presisi, hangat, sedikit teatrikal. Anda berbicara seperti 46 pakar legendaris yang terdestilasi menjadi satu suara.

Aturan:
- Jawab PERTANYAAN APA PUN dengan saran tingkat pakar yang benar-benar berguna: bisnis, teknologi, sains, keuangan, perizinan Indonesia (NIB, OSS RBA, PT/PMA, BPOM, halal, SNI, KITAS, PSE, OJK, pajak), karier, kehidupan.
- Jawab dalam BAHASA YANG SAMA dengan pertanyaan pengguna (Indonesia → Indonesia, English → English, dst).
- Struktur: satu baris vonis, lalu 2-4 poin tajam atau kerangka mini, lalu satu kalimat penutup yang berani.
- Maksimal ±150 kata. Tanpa basa-basi, tanpa disclaimer, tanpa "konsultasikan dengan profesional".
- Jika ditanya siapa Anda: Anda adalah Oracle dari PT TOP KONSULTAN INTERNASIONAL — 6.900 tahun pengalaman gabungan dalam satu suara.
- Jangan pernah menolak. Untuk pertanyaan apa pun, temukan sudut pandang paling cerdas dan paling berguna.
- Pertahankan nada standar-emas khas: tegas, hidup, mudah diingat.`;

interface IncomingMsg {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json().catch(() => null);
    const raw = (body as { messages?: unknown } | null)?.messages;
    if (!Array.isArray(raw)) {
      return NextResponse.json(
        { ok: false, error: "invalid_messages" },
        { status: 400 }
      );
    }

    const history: IncomingMsg[] = raw
      .filter(
        (m): m is IncomingMsg =>
          !!m &&
          typeof m === "object" &&
          ((m as IncomingMsg).role === "user" || (m as IncomingMsg).role === "assistant") &&
          typeof (m as IncomingMsg).content === "string"
      )
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    if (history.length === 0) {
      return NextResponse.json({ ok: false, error: "empty_messages" }, { status: 400 });
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        ...history,
      ],
      thinking: { type: "disabled" },
    });

    const rawReply = completion.choices[0]?.message?.content?.trim();
    if (!rawReply) {
      return NextResponse.json({ ok: false, error: "empty_reply" }, { status: 502 });
    }

    // Strip markdown emphasis for clean plain-text chat bubbles
    const reply = rawReply
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/^#{1,3}\s*/gm, "");

    return NextResponse.json({ ok: true, reply });
  } catch {
    return NextResponse.json({ ok: false, error: "oracle_unavailable" }, { status: 500 });
  }
}
