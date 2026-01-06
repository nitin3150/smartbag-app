export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
} as const;

export const ORDER_STATUS = {
    PREPARING: 'preparing',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    ASSIGNING: 'assigning',
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export const STATUS_COLORS: Record<OrderStatus, string> = {
    [ORDER_STATUS.PREPARING]: 'bg-yellow-400',
    [ORDER_STATUS.OUT_FOR_DELIVERY]: 'bg-blue-500',
    [ORDER_STATUS.DELIVERED]: 'bg-green-500',
    [ORDER_STATUS.CANCELLED]: 'bg-red-500',
    [ORDER_STATUS.ASSIGNING]: 'bg-orange-500',
};

export const CART_LIMITS = {
    MAX_QUANTITY: 99,
    MIN_ORDER_AMOUNT: 10,
    MAX_ORDER_AMOUNT: 100000,
} as const;

export const API_TIMEOUTS = {
    DEFAULT: 15000,
    UPLOAD: 60000,
    DOWNLOAD: 30000,
} as const;

export const STORAGE_KEYS = {
    USER_PREFERENCES: '@smartbag/preferences',
    LAST_LOCATION: '@smartbag/location',
} as const;