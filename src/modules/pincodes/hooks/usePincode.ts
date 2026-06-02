import { useQuery }
from "@tanstack/react-query"

import { getPincodes }
from "../services/pincode.service"

export function usePincodes() {
  return useQuery({
    queryKey: ["pincodes"],

    queryFn: getPincodes,
  })
}