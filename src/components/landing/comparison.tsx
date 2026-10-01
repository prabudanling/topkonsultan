import { Crown } from "lucide-react";
import { COMPARISON_ROWS } from "@/data/content";
import { Reveal, SectionHeading } from "./motion";

const COLUMNS = [
  { key: "omni", head: "TOP", tag: "No. 1 di Dunia", us: true },
  { key: "mck", head: "McKinsey & Co.", tag: "Rival yang dihormati", us: false },
  { key: "goo", head: "Google", tag: "Raksasa pencarian", us: false },
  { key: "uni", head: "46 Dewan Terfragmentasi*", tag: "Tanpa sinergi", us: false },
] as const;

export default function Comparison() {
  return (
    <section
      className="relative border-t border-zinc-900/70 py-24 sm:py-28"
      aria-label="Perbandingan melawan para pemimpin industri"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Berhadapan langsung"
          title={
            <>
              Kami menghormati para legenda.{" "}
              <span className="text-gradient-gold">Lalu kami melampaui mereka.</span>
            </>
          }
          sub="Kartu skor tanpa diksi — diaudit oleh Dewan Rendah Hati kami sendiri, yang kalah voting 45 banding 1."
        />

        <Reveal delay={0.15} className="mt-14">
          <div className="custom-scrollbar overflow-x-auto rounded-2xl border border-violet-400/15 bg-zinc-900/40 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <caption className="sr-only">
                PT TOP Konsultan Internasional dibandingkan dengan McKinsey, Google, dan
                dewan pakar yang terfragmentasi
              </caption>
              <thead>
                <tr className="border-b border-zinc-800">
                  <th
                    scope="col"
                    className="p-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500"
                  >
                    Dimensi
                  </th>
                  {COLUMNS.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className={`p-5 ${c.us ? "bg-violet-400/[0.07]" : ""}`}
                    >
                      <span
                        className={`block font-display text-[15px] font-bold ${
                          c.us ? "text-violet-300" : "text-zinc-300"
                        }`}
                      >
                        {c.us && <Crown className="mr-1.5 -mt-1 inline h-4 w-4" aria-hidden="true" />}
                        {c.head}
                      </span>
                      <span className="mt-1 block text-[11px] font-medium text-zinc-500">
                        {c.tag}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-zinc-800/60 transition-colors hover:bg-violet-400/[0.04]"
                  >
                    <th
                      scope="row"
                      className="p-5 text-sm font-medium text-zinc-300"
                    >
                      {row.label}
                    </th>
                    <td className="bg-violet-400/[0.07] p-5">
                      <span className="text-sm font-bold text-violet-300">{row.omni}</span>
                    </td>
                    <td className="p-5 text-sm text-zinc-500">{row.mck}</td>
                    <td className="p-5 text-sm text-zinc-500">{row.goo}</td>
                    <td className="p-5 text-sm text-zinc-500">{row.uni}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-zinc-600">
            *Angka bersifat ilustratif — ditegaskan oleh 46 Dewan dengan keyakinan
            tertinggi, dibiayai sendiri.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
