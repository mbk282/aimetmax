import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Max van den Broek",
  description:
    "AI-expert Max van den Broek. Auteur van AI-Pionier, AI Expert bij Alliander, en voormalig Senior AI Docent aan de UvA.",
};

import Image from "next/image";

export default function OverPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Image
          src="/max-van-den-broek.jpg"
          alt="Max van den Broek"
          width={160}
          height={160}
          className="shrink-0 rounded-2xl object-cover"
        />
        <h1 className="text-3xl font-bold text-gray-900">Over Max</h1>
      </div>
      <div className="mt-8 space-y-4 text-gray-600">
        <p>
          Ik ben Max van den Broek, AI-expert met een achtergrond in Logic (MSc,
          UvA). Ik werk als AI Expert bij Alliander en geef daarnaast freelance
          AI-trainingen en keynotes.
        </p>
        <p>
          Eerder was ik vier jaar Senior AI Docent aan de Universiteit van
          Amsterdam. Daar ontwikkelde ik cursussen over generatieve AI en hielp
          ik honderden studenten en professionals om AI te begrijpen en toe te
          passen.
        </p>
        <p>
          Ik schreef het boek{" "}
          <strong>AI-Pionier: Hoe jij ook begint met generatieve AI</strong>,
          uitgegeven door Koninklijke Boom Uitgevers.
        </p>
        <h2 className="pt-4 text-xl font-bold text-gray-900">
          Wat ik doe bij organisaties
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Doelgroepgerichte Copilot-trainingen: financiele voorbeelden voor
            controllers, contractanalyse voor juristen, code voor developers
          </li>
          <li>
            Hands-on aanpak: deelnemers oefenen direct zelf, dat versnelt adoptie
          </li>
          <li>
            Ik maak trainingen het liefst samen met iemand uit het team voor
            maximale aansluiting
          </li>
          <li>Bouw POCs en simpele AI-applicaties</li>
          <li>
            Combinatie van hands-on bouwen en zorgen dat mensen het daadwerkelijk
            gaan gebruiken
          </li>
        </ul>
      </div>
    </section>
  );
}
