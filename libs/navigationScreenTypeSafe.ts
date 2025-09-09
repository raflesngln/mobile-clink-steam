import { router } from "expo-router";

// type NavigateOptions<Params> = {
//   pathname: any; // ← tidak perlu extend dari 'Path'
//   params: Params;
//   usePush?: boolean;
// };

// export function navigateWithParams<Params extends Record<string, any>>(
//   options: NavigateOptions<Params>
// ) {
//   const { pathname, params, usePush = true } = options;
//   const method = usePush ? router.push : router.navigate;
//   method({ pathname, params });
// }

export function navigateWithParamsFunctions(
  options: { pathname: any; params: any; usePush?: boolean }
) {
  const { pathname, params, usePush = true } = options;
  const method = usePush ? router.push : router.navigate;
  method({ pathname, params });
}



/**
 * PENGGUNAAN NAVIGASI DI DALAM COMPONEN SCREEN
 *
navigateWithParams({
  pathname: "/dashboard",
  params: { id: 123, shouldRefresh: "false" },
  usePush: false, // default true berarti pakai router.push
});


ATAU BUAT REFRESH BACK

navigateWithParams({
  pathname: "/ocean_export/[id]",
  params: { id: 123, shouldRefresh: "true" },
});



 */