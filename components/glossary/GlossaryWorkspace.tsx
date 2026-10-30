// Glossary workspace: every abbreviation in the app, grouped and defined.
"use client";

import { glossary, glossaryEntryCount } from "../../data/glossary";
import { glossaryId } from "../../data/glossary/id";
import { useLanguage } from "../LanguageProvider";
import Table from "../ui/Table";

export default function GlossaryWorkspace() {
  const { lang, copy: ui } = useLanguage();
  const copy = ui.glossary;
  return (
    <div className="cm-container glossary-root">
      <header className="glossary-hero">
        <p className="t-label-code">{copy.eyebrow}</p>
        <h1 className="t-headline-lg">{copy.title}</h1>
        <p>{copy.intro}</p>
        <p className="t-label-code">
          {glossaryEntryCount} {copy.countLabel}
        </p>
      </header>

      {glossary.map((group) => (
        <section key={group.id} className="glossary-group" aria-label={copy.groups[group.id]}>
          <h2 className="t-headline-sm">{copy.groups[group.id]}</h2>
          <Table>
            <thead>
              <tr>
                <th scope="col">{copy.colAbbreviation}</th>
                <th scope="col">{copy.colMeans}</th>
                <th scope="col">{copy.colWhat}</th>
                <th scope="col">{copy.colWhere}</th>
              </tr>
            </thead>
            <tbody>
              {group.entries.map((entry) => {
                const translated = lang === "id" ? glossaryId[entry.abbr] : undefined;
                return (
                  <tr key={entry.abbr}>
                    <td className="t-label-code">{entry.abbr}</td>
                    <td>{translated?.expansion ?? entry.expansion}</td>
                    <td>{translated?.plain ?? entry.plain}</td>
                    <td className="t-label-code">{copy.where[entry.where]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>
      ))}
    </div>
  );
}