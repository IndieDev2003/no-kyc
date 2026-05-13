import { Button } from "#components/ui/button";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

function CoinInfo() {
  return (
    <div className="flex flex-1 justify-between  border rounded-xl  px-2 py-1 items-center border-gray-300">
      <div className="flex gap-2 items-center">
        <img src={coin.image} alt="" className="size-10 border-3 rounded-full" />
        <h2 className="">
          <span className="uppercase text-sm">{coin.symbol}</span>
          <span className="text-xs p-1 px-2 mx-1 bg-gray-200 rounded-xl">
            {coin.name}
          </span>
        </h2>
      </div>
      <div className="flex gap-2">
        <h3 className="flex text-sm items-center justify-center gap-1 bg-green-300 px-2 py-1 rounded-lg ">
          <ArrowUpRight size={15} color="green" />$ {coin.high_24h}
        </h3>
        <h3 className="flex text-sm items-center justify-center gap-1 bg-red-300 px-2 py-1 rounded-lg">
          <ArrowDownRight size={15} color="red" />${coin.low_24h}
        </h3>
      </div>
      <div className="flex gap-1 items-center">
        <p className="text-sm px-2 py-1 bg-amber-100 rounded-lg">${coin.current_price}</p>
        <Button className="px-4 py-4">Open</Button>
      </div>
    </div>
  );
}

export default CoinInfo;




const coin = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image:
    "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  current_price: 80734,
  market_cap: 1617039997948,
  market_cap_rank: 1,
  fully_diluted_valuation: 1617041047537,
  total_volume: 32825389732,
  high_24h: 82041,
  low_24h: 80487,
  price_change_24h: -387.247609416896,
  price_change_percentage_24h: -0.47737,
  market_cap_change_24h: -1898041474.508545,
  market_cap_change_percentage_24h: -0.11724,
  circulating_supply: 20028321,
  total_supply: 20028334,
  max_supply: 21000000,
  ath: 126080,
  ath_change_percentage: -35.96631,
  ath_date: "2025-10-06T18:57:42.558Z",
  atl: 67.81,
  atl_change_percentage: 118960.30275,
  atl_date: "2013-07-06T00:00:00.000Z",
  roi: null,
  last_updated: "2026-05-12T13:42:44.036Z",
  price_change_percentage_1h_in_currency: -0.198878286979436,
};
