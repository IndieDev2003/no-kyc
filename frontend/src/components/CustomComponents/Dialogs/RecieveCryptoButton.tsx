import { Button } from "#components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "#components/ui/field";
import { Input } from "#components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select";
import { ZRecieveCrypto } from "#lib/zod";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

const CRYPTO_ADDRESSES: Record<string, Record<string, string>> = {
  usdt: {
    trc20: "TXyz...yourTRC20Address",
    bep20: "0xabc...yourBEP20Address",
    erc20: "0xabc...yourERC20Address",
    bnb20: "bnb1...yourBNB20Address",
  },
  btc: {
    trc20: "",
    bep20: "0xabc...yourBTCBEP20Address",
    erc20: "",
    bnb20: "",
  },
  eth: {
    trc20: "",
    bep20: "0xabc...yourETHBEP20Address",
    erc20: "0xabc...yourETHERC20Address",
    bnb20: "",
  },
  ltc: {
    trc20: "",
    bep20: "0xabc...yourLTCBEP20Address",
    erc20: "",
    bnb20: "",
  },
  xmr: {
    trc20: "",
    bep20: "",
    erc20: "",
    bnb20: "",
  },
};

function RecieveCryptoButton({ trigger,className }: any) {
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");

  const derivedAddress =
    selectedCoin && selectedNetwork
      ? (CRYPTO_ADDRESSES[selectedCoin]?.[selectedNetwork] ?? "")
      : "";

  const form = useForm({
    validators: {
      onChange: ZRecieveCrypto,
      onBlur: ZRecieveCrypto,
      onSubmit: ZRecieveCrypto,
    },
  });

  return (
    <Dialog>
      <DialogTrigger className={`${className}`}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recieve Crypto</DialogTitle>
          <DialogDescription>
            Recieve crypto into Alpha wallet from external sources
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();

            toast.success("Transaction Pending for Verification", {
              description: "Coin deposit pending for verification",
            });
          }}
        >
          <FieldGroup>
            <form.Field
              name="cryptoCoin"
              validators={{
                onChange: ZRecieveCrypto.shape.cryptoCoin,
                onBlur: ZRecieveCrypto.shape.cryptoCoin,
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Select Crypto to Receive
                    </FieldLabel>
                    <Select
                      name={field.name}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        setSelectedCoin(value);
                        setSelectedNetwork(""); // reset network on coin change
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Crypto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="usdt">USDT</SelectItem>
                          <SelectItem value="btc">Bitcoin</SelectItem>
                          <SelectItem value="ltc">Litecoin</SelectItem>
                          <SelectItem value="eth">Ethereum</SelectItem>
                          <SelectItem value="xmr">Monero</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="cryptoNetwork"
              validators={{
                onChange: ZRecieveCrypto.shape.cryptoNetwork,
                onBlur: ZRecieveCrypto.shape.cryptoNetwork,
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Select Network</FieldLabel>
                    <Select
                      name={field.name}
                      value={selectedNetwork}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        setSelectedNetwork(value);
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="trc20">TRC-20</SelectItem>
                          <SelectItem value="bep20">BEP-20</SelectItem>
                          <SelectItem value="erc20">ERC-20</SelectItem>
                          <SelectItem value="bnb20">BNB-20</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <Field>
              <FieldLabel>Network Address</FieldLabel>
              <Input
                readOnly
                value={derivedAddress}
                placeholder={
                  !selectedCoin
                    ? "Select a coin first"
                    : !selectedNetwork
                      ? "Select a network"
                      : "No address for this combination"
                }
              />
            </Field>

            <form.Field
              name="txnHash"
              validators={{
                onChange: ZRecieveCrypto.shape.txnHash,
                onBlur: ZRecieveCrypto.shape.txnHash,
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Transaction Hash
                    </FieldLabel>
                    <Input
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Transaction Hash"
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <div className="flex flex-col space-y-1">
              <Button className="bg-green-500 py-2" type="submit">
                Submit
              </Button>
              <DialogClose className="flex-1">
                <Button type="reset" className="w-full py-2" variant={"destructive"}>
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RecieveCryptoButton;
