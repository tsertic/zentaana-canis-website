import { DocumentActionComponent, DocumentActionsContext } from "sanity";
import { AiNewsAction } from "./components/AiNewsAction";

const AI_ENABLED_TYPES = ["news", "dog", "litter"];

export function resolveActions(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext,
) {
  if (context.schemaType === "siteSettings") {
    return prev.filter(
      (action) => action.action !== "duplicate" && action.action !== "delete",
    );
  }

  if (AI_ENABLED_TYPES.includes(context.schemaType)) {
    return [AiNewsAction as unknown as DocumentActionComponent, ...prev];
  }

  return prev;
}
