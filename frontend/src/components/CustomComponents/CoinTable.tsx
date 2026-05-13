import { Card, CardContent } from "#components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#components/ui/table";
import type { Coin } from "#lib/zod";

function CoinTable({ coins }: { coins: Coin[] }) {
 
  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Coin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h %</TableHead>
                <TableHead>1h %</TableHead>
                <TableHead>Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coins.map((coin) => {
                const is24hPositive = coin.price_change_percentage_24h >= 0;
                const is1hPositive =
                  coin.price_change_percentage_1h_in_currency >= 0;

                return (
                  <TableRow key={coin.id}>
                    <TableCell className="text-muted-foreground">
                      {coin.market_cap_rank}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={coin.image}
                          className="size-6"
                          alt={coin.name}
                        />
                        <span className="font-medium">{coin.name}</span>
                        <span className="text-muted-foreground uppercase text-xs">
                          {coin.symbol}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      ${coin.current_price.toLocaleString()}
                    </TableCell>

                    <TableCell
                      className={
                        is24hPositive ? "text-green-500" : "text-red-500"
                      }
                    >
                      {is24hPositive ? "+" : ""}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    <TableCell
                      className={
                        is1hPositive ? "text-green-500" : "text-red-500"
                      }
                    >
                      {is1hPositive ? "+" : ""}
                      {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                    </TableCell>

                    <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default CoinTable;
