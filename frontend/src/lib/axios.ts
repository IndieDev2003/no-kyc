import axios from "axios";

const coinGeckoAPI = import.meta.env.COINGECKO_API;

export const getCryptoList = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&price_change_percentage=1h&include_tokens=top&order=volume_desc&per_page=100",
      {
        headers: {
          "x-cg-demo-api-key": coinGeckoAPI,
        },
      },
    );
    // console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
