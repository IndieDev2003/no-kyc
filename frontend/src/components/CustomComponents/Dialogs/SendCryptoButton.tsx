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
import { ZSendCoin } from "#lib/zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

function SendCryptoButton({ trigger, className }: any) {
  const form = useForm({
    onSubmit: () => {
      toast.success("Send requested ", {
        description: "Processing your requested",
      });
    },
    validators: {
      onChange: ZSendCoin,
      onBlur: ZSendCoin,
      onSubmit: ZSendCoin,
    },
  });
  return (
    <Dialog>
      <DialogTrigger className={`${className}`}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Crypto</DialogTitle>
          <DialogDescription>
            Send crypto to another wallet or exchange
          </DialogDescription>
        </DialogHeader>
        <form
          id="send-crypto"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="cryptoCoin"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Select Crypto to Send
                    </FieldLabel>
                    <Select
                      name={field.name}
                      onValueChange={(value) => {
                        field.handleChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Crypto to withdraw" />
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
                    {isInvalid && <FieldError errors={form.state.errors} />}
                  </Field>
                );
              }}
            />
            <form.Field
              name="cryptoNetwork"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Select Network</FieldLabel>
                    <Select
                      name={field.name}
                      onValueChange={(value) => {
                        field.handleChange(value);
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

            <form.Field
              name="sendAmount"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Amount to send</FieldLabel>
                    <Input
                      name={field.name}
                      placeholder="Amount to send in numbers"
                      onChange={(e) => {
                        const parsed = parseFloat(e.target.value);
                        field.handleChange(
                          isNaN(parsed) || parsed <= 0 ? 0 : parsed,
                        );
                      }}
                      type="number"
                      min={0}
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="destinationAddress"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Destination Address
                    </FieldLabel>
                    <Input
                      type={"text"}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Destination Address"
                      autoComplete="off"
                      required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <div className="space-y-1 flex flex-col">
              <Button
                className="flex-1 py-2 w-full bg-green-500"
                variant={"default"}
                type="submit"
              >
                Send
              </Button>
              <DialogClose className="flex flex-col space-y-1 w-full">
                <Button
                  onClick={() => toast.info("Transfer request cancelled")}
                  className="w-full py-2 flex-1"
                  variant={"destructive"}
                  type="reset"
                >
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

export default SendCryptoButton;
