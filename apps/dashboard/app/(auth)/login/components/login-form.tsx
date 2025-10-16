"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@byte24/ui";
import { Button } from "@byte24/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@byte24/ui/components/form";
import { Input } from "@byte24/ui/components/input";
import { authClient, getErrorMessage } from "@dashboard/common/auth-client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Voer een geldig e-mailadres in",
  }),
  password: z.string().min(1, {
    message: "Voer een wachtwoord in",
  }),
});

const TwoFactorSchema = z.object({
  twoFactorCode: z.string().min(6, {
    message: "Voer een geldige two-factor code in",
  }),
  trustDevice: z.boolean(),
});

const BackupCodeSchema = z.object({
  backupCode: z.string().min(10, {
    message: "Voer een geldige backup code in",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<
    "login" | "two-factor" | "backup-codes" | "unverified-email"
  >("login");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const twoFactorForm = useForm<z.infer<typeof TwoFactorSchema>>({
    resolver: zodResolver(TwoFactorSchema),
    defaultValues: {
      twoFactorCode: "",
      trustDevice: false,
    },
  });

  const backupCodeForm = useForm<z.infer<typeof BackupCodeSchema>>({
    resolver: zodResolver(BackupCodeSchema),
    defaultValues: {
      backupCode: "",
    },
  });

  async function submitTwoFactor(values: z.infer<typeof TwoFactorSchema>) {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.twoFactor.verifyTotp({
        code: values.twoFactorCode,
        trustDevice: values.trustDevice,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Je bent succesvol ingelogd");

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Ongeldige two-factor code");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.code === "EMAIL_NOT_VERIFIED") {
          setUnverifiedEmail(values.email);
          setView("unverified-email");
          return;
        }

        if (error.status === 500) {
          toast.error("Ongeldige e-mailadres of wachtwoord");
          return;
        }

        if (error.status === 429) {
          toast.error(
            "Je probeert te snel achter elkaar. Probeer het later opnieuw."
          );
          return;
        }

        throw new Error(error.code);
      }

      //@ts-ignore
      if (data?.twoFactorRedirect) {
        setView("two-factor");
        return;
      }

      toast.success("Je bent succesvol ingelogd");

      router.push("/");
    } catch (error: any) {
      console.log(error);
      console.log("error", error);
      toast.error(
        getErrorMessage(
          error.message,
          "nl",
          "Je probeert te snel achter elkaar. Probeer het later opnieuw."
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  const submitBackupCode = async (values: z.infer<typeof BackupCodeSchema>) => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.twoFactor.verifyBackupCode({
        code: values.backupCode,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(
        "Je bent succesvol ingelogd. Backup code is gebruikt. Zorg ervoor dat je je 2-factor opnieuw instelt bij instellingen."
      );

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Ongeldige backup code");
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: unverifiedEmail,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Verificatie e-mail is opnieuw verzonden");
    } catch (error) {
      console.log(error);
      toast.error("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  if (view === "unverified-email") {
    return (
      <Card className="w-full max-w-[500px]" key={view}>
        <CardHeader>
          <CardTitle>E-mail niet geverifieerd</CardTitle>
          <CardDescription>
            Je e-mailadres is nog niet geverifieerd. Controleer je inbox voor
            een verificatie e-mail.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Heb je de verificatie e-mail niet ontvangen? Klik op de knop
              hieronder om een nieuwe te ontvangen.
            </p>
            <Button
              type="button"
              className="w-full"
              disabled={isLoading}
              loading={isLoading}
              onClick={resendVerificationEmail}
            >
              {isLoading ? (
                <>Versturen...</>
              ) : (
                "Verificatie e-mail opnieuw versturen"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setView("login")}
            >
              Terug naar inloggen
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (view === "backup-codes") {
    return (
      <Card className="w-full max-w-[500px]" key={view}>
        <CardHeader>
          <CardTitle>Backup codes</CardTitle>
          <CardDescription>
            Voer een van je backup codes in om toegang te krijgen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...backupCodeForm}>
            <form
              onSubmit={backupCodeForm.handleSubmit(submitBackupCode)}
              className="space-y-4"
            >
              <FormField
                control={backupCodeForm.control}
                name="backupCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Backup code</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxxx-xxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                loading={isLoading}
              >
                {isLoading ? <>Verifiëren...</> : "Verifiëren"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mb-4 w-full"
                onClick={() => setView("login")}
              >
                Terug naar inloggen
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  if (view === "two-factor") {
    return (
      <Card className="w-full max-w-[500px]" key={view}>
        <CardHeader>
          <CardTitle>2-Factor Authenticatie</CardTitle>
          <CardDescription>
            Voer de code in van je authenticatie app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...twoFactorForm}>
            <form
              onSubmit={twoFactorForm.handleSubmit(submitTwoFactor)}
              className="space-y-4"
            >
              <FormField
                control={twoFactorForm.control}
                name="twoFactorCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2-Factor Code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={twoFactorForm.control}
                name="trustDevice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center">
                        <Checkbox
                          id="trustDevice"
                          onCheckedChange={(e) =>
                            //@ts-ignore
                            twoFactorForm.setValue("trustDevice", e)
                          }
                          checked={field.value}
                          value={1}
                          className="mr-2"
                        />
                        <div>
                          <FormLabel htmlFor="trustDevice">
                            Vertrouw dit apparaat
                          </FormLabel>
                          <FormDescription>
                            Dit apparaat wordt onthouden voor toekomstige
                            inlogpogingen en 2-factor authenticatie.
                          </FormDescription>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                loading={isLoading}
              >
                {isLoading ? <>Verifiëren...</> : "Verifiëren"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mb-4 w-full"
                onClick={() => setView("backup-codes")}
              >
                2-factor code kwijt?
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>Inloggen</CardTitle>
        <CardDescription>
          Voer je gegevens in om toegang te krijgen tot het dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="naam@voorbeeld.nl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wachtwoord</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword
                            ? "Verberg wachtwoord"
                            : "Toon wachtwoord"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-muted-foreground text-sm hover:underline"
              >
                Wachtwoord vergeten?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? <>Inloggen...</> : "Inloggen"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter className='flex flex-col space-y-4'>
        <div className='relative w-full'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Of ga verder met
            </span>
          </div>
        </div>
        <Button
          variant='outline'
          type='button'
          disabled={true}
          className='w-full'
        >
          <BsGoogle className='mr-2 h-5 w-5' />
          Google
        </Button>
      </CardFooter> */}
    </Card>
  );
}
