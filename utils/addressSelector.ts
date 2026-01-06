import { RootState } from "@/store/store";
import { Address } from "@/types/address.types";

export const selectDefaultAddress = (state: RootState): Address | null =>
    state.address.items.find(a => a.is_default) ?? null;
