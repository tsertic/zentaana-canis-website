import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Zentaana Canis")
    .items([
      S.listItem()
        .title("Postavke stranice")
        .icon(() => "⚙️")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Postavke stranice"),
        ),

      S.divider(),

      S.listItem()
        .title("Psi")
        .icon(() => "🐕")
        .child(
          S.list()
            .title("Psi")
            .items([
              S.listItem()
                .title("Svi psi")
                .child(
                  S.documentTypeList("dog")
                    .title("Svi psi")
                    .defaultOrdering([{ field: "name", direction: "asc" }]),
                ),
              S.listItem()
                .title("Mužjaci")
                .icon(() => "♂️")
                .child(
                  S.documentTypeList("dog")
                    .title("Mužjaci")
                    .filter('gender == "male"'),
                ),
              S.listItem()
                .title("Ženke")
                .icon(() => "♀️")
                .child(
                  S.documentTypeList("dog")
                    .title("Ženke")
                    .filter('gender == "female"'),
                ),
              S.listItem()
                .title("Rasplodni")
                .icon(() => "⭐")
                .child(
                  S.documentTypeList("dog")
                    .title("Rasplodni psi")
                    .filter("isBreeder == true"),
                ),
            ]),
        ),

      S.listItem()
        .title("Legla")
        .icon(() => "🐾")
        .child(
          S.list()
            .title("Legla")
            .items([
              S.listItem()
                .title("Sva legla")
                .child(
                  S.documentTypeList("litter")
                    .title("Sva legla")
                    .defaultOrdering([
                      { field: "dateOfBirth", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("Aktualna / Dostupna")
                .icon(() => "🟢")
                .child(
                  S.documentTypeList("litter")
                    .title("Aktualna legla")
                    .filter('status in ["available", "born", "expected"]'),
                ),
              S.listItem()
                .title("Planirana")
                .icon(() => "📋")
                .child(
                  S.documentTypeList("litter")
                    .title("Planirana legla")
                    .filter('status == "planned"'),
                ),
              S.listItem()
                .title("Zatvorena")
                .icon(() => "🔒")
                .child(
                  S.documentTypeList("litter")
                    .title("Zatvorena legla")
                    .filter('status == "closed"'),
                ),
            ]),
        ),

      S.listItem()
        .title("Novosti")
        .icon(() => "📰")
        .child(
          S.list()
            .title("Novosti")
            .items([
              S.listItem()
                .title("Sve novosti")
                .child(
                  S.documentTypeList("news")
                    .title("Sve novosti")
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("Izložbe")
                .icon(() => "🏆")
                .child(
                  S.documentTypeList("news")
                    .title("Izložbe")
                    .filter('category == "shows"'),
                ),
              S.listItem()
                .title("Rezultati")
                .icon(() => "📊")
                .child(
                  S.documentTypeList("news")
                    .title("Rezultati")
                    .filter('category == "results"'),
                ),
            ]),
        ),

      S.listItem()
        .title("Galerija")
        .icon(() => "📸")
        .child(
          S.documentTypeList("gallery")
            .title("Albumi")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
    ]);
