import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { ArrowDownRight,ArrowUpRight, DollarSign } from "lucide-react";
import SendCryptoButton from "./Dialogs/SendCryptoButton";
import WithdrawCryptoButton from "./Dialogs/WithdrawCryptoButton";
import RecieveCryptoButton from "./Dialogs/RecieveCryptoButton";

function BalanaceCard() {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-left">
          <h1 className="text-5xl">$0.0000</h1>
          <p className="text-green-500">$0.001+</p>
        </div>
        <div className="flex mt-4">
          <SendCryptoButton
            trigger={
              <Button className="w-full py-5 px-4 text-center">
                <ArrowUpRight /> Send
              </Button>
            }
            className="w-1/3"
          />

          <RecieveCryptoButton
            trigger={
              <Button className="w-full py-5 px-4 text-center">
                <ArrowDownRight />
                Recieve
              </Button>
            }
            className="w-1/3"
          />
          <WithdrawCryptoButton
            trigger={
              <Button className="w-full py-5 px-4 text-center">
                <DollarSign />
                Withdraw
              </Button>
            }
            className="w-1/3"
          />

          {/* <Button className="flex-1 py-5"><ArrowUpDown/>Swap</Button> */}
        </div>
      </CardContent>
    </Card>
  );
}

export default BalanaceCard;
