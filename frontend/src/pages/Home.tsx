// import BalanaceCard from "#components/CustomComponents/BalanaceCard";
// import CoinInfo from "#components/CustomComponents/Home/CoinInfo";
// import SendCrypto from "#components/CustomComponents/SendCrypto";
// import { getCryptoList } from "#lib/axios";

import BalanaceCard from "#components/CustomComponents/BalanaceCard"
import CoinTable from "#components/CustomComponents/CoinTable"
import Header from "#components/CustomComponents/Header"
import { getCryptoList } from "#lib/axios"
import { useQuery } from "@tanstack/react-query"

// import { useSuspenseQuery } from "@tanstack/react-query";

// function Home() {
//   const {data:coin,isPending} = useSuspenseQuery({
//     queryKey:['coins'],
//     queryFn:getCryptoList
//   });
// if(isPending) return <>Loading</>

//   return (
//     <div className="flex w-[75vw] justify-between p-2 ">
//       <div className="w-3/4">
//         {/* <BalanaceCard /> */}
//         <div>
//           {/* Assets Info */}
//           <CoinInfo />
//         </div>
//       </div>
//       <div className="w-1/4">
//         <SendCrypto />
//       </div>
//     </div>
//   );
// }

// export default Home;



function Home() {
  const {data:coins,isLoading} = useQuery({
    queryKey:['coins'],
    queryFn:getCryptoList
  })
  if(isLoading) return <div className="flex items-center justify-center h-screen w-screen"><h2>Loading Wallet</h2></div>
  return (
    <div className="bg-gray-300 min-h-screen p-2 space-y-1">
      <Header />
      <BalanaceCard />
      <CoinTable coins={coins}/>
    </div>
  );
}

export default Home
