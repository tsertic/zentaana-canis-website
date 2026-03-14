import { DocumentActionComponent } from "sanity";

export function resolveActions(
  prev: DocumentActionComponent[],
  context: { schemaType: string },
) {
  if (context.schemaType === "siteSettings") {
    return prev.filter(
      (action) => action.action !== "duplicate" && action.action !== "delete",
    );
  }
  return prev;
}
