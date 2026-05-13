import z from "zod";

export const ZLogin = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Minimum password length is 6")
    .max(24, "Maximum password length is 24"),
});

export const ZRegister = z.object({
  username: z
    .string()
    .min(5, "Minimum username length is 5")
    .max(24, "Maximum username length is 24")
    .optional(),
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Minimum password length is 6")
    .max(24, "Maximum password length is 24"),
  confirmPassword: z
    .string()
    .min(6, "Minimum password length is 6")
    .max(24, "Maximum password length is 24"),
});
export const ZTransaction = z.object({
  userId: z.string(),
  amount: z.number().gt(0, "Transaction amount must be greater than 0"),
  transactionHash: z.string("Transaction hash required to verify Transaction"),
  swapCurrency: z.string("Currency required"),
  swapCrypto: z.string("Crypto Required"),
  transactionStatus: z.enum(["Pending", "Done", "Disputed"]).default("Pending"),
});
export const ZOrder = z.object({
  userId: z.string(),
  orderAmount: z.number().gt(0, "Order amount must be greater than 0"),
  orderDate: z.coerce.date().default(() => new Date()),
});

export const ZRecieveCrypto = z.object({
  cryptoCoin: z.enum(["usdt", "eth", "ltc", "btc", "xmr"]),
  cryptoNetwork: z.enum(["trc20", "erc20", "bep20", "bnb20"]),
  txnHash: z
    .string("Transaction Hash must be string")
    .min(10, "Transaction Hash must be 10 charecters long")
    .max(40, "Transaction Hash must be less than 40 charecters"),
});

export const ZSendCoin = z.object({
  cryptoCoin: z.enum(["usdt", "eth", "ltc", "btc", "xmr"]),
  cryptoNetwork: z.enum(["trc20", "erc20", "bep20", "bnb20"]),
  sendAmount: z.number().min(0).max(100000, "Too large amount for transfer"),
  destinationAddress: z
    .string()
    .min(10, "Too short for Crypto Address")
    .max(30, "Too large to be Crypto Address"),
});

// --- Type Inference ---
// This exports the TS types based on the schemas above

export type TLogin = z.infer<typeof ZLogin>;
export type TRegister = z.infer<typeof ZRegister>;
export type TTransaction = z.infer<typeof ZTransaction>;
export type TOrder = z.infer<typeof ZOrder>;

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
};
