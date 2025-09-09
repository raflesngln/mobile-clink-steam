import { router } from "expo-router";

type Params = Record<string, string | number | undefined>;
type NavMethod = "push" | "navigate" | "replace";

export function navigateWithParams({
  pathname,
  pathParams = {},
  queryParams = {},
  navType = "push",
}: {
  pathname: string; // ex: "/detail/[id]"
  pathParams?: Params; // ex: { id: 123 }
  queryParams?: Params; // ex: { tab: "info" }
  navType: NavMethod; // "push" (default), "navigate", or "replace"
}) {
  let builtPath = pathname;

  // Ganti segment dinamis [param] dengan nilai dari pathParams
  Object.entries(pathParams).forEach(([key, value]) => {
    builtPath = builtPath.replace(
      `[${key}]`,
      encodeURIComponent(String(value))
    );
  });

  // Buat query string jika ada
  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  const finalUrl =
    searchParams.toString().length > 0
      ? `${builtPath}?${searchParams.toString()}`
      : builtPath;

  // Tentukan metode navigasi
  const method =
    navType === "replace"
      ? router.replace
      : navType === "navigate"
      ? router.navigate
      : router.push;

  method(finalUrl as any);
}