import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
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
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function SendCrypto() {
  const form = useForm();
  const [method, setMethod] = useState("");
  const [crypto, setCrypto] = useState("");

  useEffect(() => {
    console.log("Method :", method);
    console.log("Crypto :", crypto);
  });
  return (
    <Card className="w-84">
      <CardHeader>
        <CardTitle>Send Crypto</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="sendCrypto"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        //   className="w-[80vh] bg-white"
        >
          <FieldGroup>
            <form.Field
              name="crypto"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Select Crypto to Withdraw</FieldLabel>
                    <Select
                      name={field.name}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        setCrypto(value);
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
                  </Field>
                );
              }}
            />
            <form.Field
              name="method"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Select Method to Withdraw</FieldLabel>
                    <Select
                      name={field.name}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        setMethod(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Method to withdraw" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="wallet">Wallet</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="paypal">Paypal</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />

            {method === "wallet" && (
              <form.Field
                name="btc-withdraw"
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
                        placeholder="Bitcoin Address"
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
            )}

            {method === "bank" && (
              <>
                <form.Field
                  name="ifsc-code"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>IFSC Code</FieldLabel>
                        <Input
                          type={"text"}
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="IFSC Code"
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
                <form.Field
                  name="account-number"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Account Number 
                        </FieldLabel>
                        <Input
                          type={"text"}
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Account Number"
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
              </>
            )}

            {method === "paypal" && (
              <form.Field
                name="paypal"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Paypal Email</FieldLabel>
                      <Input
                        type={"email"}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="janedoe@mail.com"
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
            )}

            <Field>
                <Button onClick={()=>toast.success('Withdraw Requested Successfully',{description:'Withdraw Successfully Requested'})}>Withdraw</Button>
                <Button variant={'destructive'} onClick={()=>toast.info('Withdraw Cancelled',{description:'Withdraw Cancelled'})}>Cancel</Button>
            </Field>

          </FieldGroup>
        </form>
       </CardContent> 
     </Card>
  );
}

export default SendCrypto;
