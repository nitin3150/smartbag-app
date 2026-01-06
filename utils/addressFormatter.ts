// utils/formatAddress.ts
import { Address } from "@/types/address.types";

export const formatAddress = (a: Address) =>
    `${a.street}, ${a.city}, ${a.state} (${a.pincode}) • ${a.mobile_number}`;
