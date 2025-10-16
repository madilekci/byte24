"use client";

import { Check, Copy, Download, QrCode, Shield } from "lucide-react";
import { useState } from "react";

import { Button } from "@byte24/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@byte24/ui/components/dialog";
import { Input } from "@byte24/ui/components/input";
import { Label } from "@byte24/ui/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@byte24/ui/components/tabs";
import { cn } from "@byte24/ui/utils";
import { authClient } from "@dashboard/common/auth-client";
import { toast } from "sonner";

export default function TwoFactorAuthModal({
  alreadyEnabled,
}: {
  alreadyEnabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<
    "intro" | "password" | "qrcode" | "verify" | "success" | "backup"
  >("intro");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [copied, setCopied] = useState(false);
  const [backupCodesCopied, setBackupCodesCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // State to store data from the API
  const [totpURI, setTotpURI] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const resetModal = () => {
    setStep("intro");
    setVerificationCode("");
    setPassword("");
    setPasswordError("");
    setCopied(false);
    setBackupCodesCopied(false);
    setTotpURI("");
    setBackupCodes([]);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(resetModal, 300);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      totpURI.split("secret=")[1]?.split("&")[0] || ""
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyBackupCodes = () => {
    const codesText = backupCodes.join("\n");
    navigator.clipboard.writeText(codesText);
    setBackupCodesCopied(true);
    setTimeout(() => setBackupCodesCopied(false), 2000);
  };

  const downloadBackupCodes = () => {
    const codesText =
      "TWEE-FACTOR AUTHENTICATIE BACKUP CODES\n\n" +
      "Bewaar deze codes op een veilige plaats. Elke code kan slechts één keer worden gebruikt.\n\n" +
      backupCodes.join("\n");

    const blob = new Blob([codesText], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    document?.body?.appendChild(a);
    a?.click();
    document?.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const enableTwoFactor = async () => {
    try {
      setLoading(true);
      setPasswordError("");

      // In a real app, you would use the actual authClient
      const { data, error } = await authClient.twoFactor.enable({
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Store the data from the API
      setTotpURI(data.totpURI);
      setBackupCodes(data.backupCodes);

      // Move to the QR code step
      setStep("qrcode");
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      setPasswordError(
        "Er is een fout opgetreden. Controleer je wachtwoord en probeer het opnieuw."
      );
      toast.error(
        "Er is een fout opgetreden bij het inschakelen van twee-factor authenticatie."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyTotp = async () => {
    try {
      setLoading(true);

      // In a real app, you would use the actual authClient
      const { data, error } = await authClient.twoFactor.verifyTotp({
        code: verificationCode,
      });

      if (error) {
        throw new Error(error.message);
      }

      // If verification is successful, move to success step
      setStep("success");
      toast.success("Twee-factor authenticatie is succesvol ingeschakeld.");
    } catch (error) {
      console.error("Error verifying TOTP:", error);
      toast.error("De ingevoerde code is ongeldig. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={alreadyEnabled ? "outline" : "default"}
          className="gap-2"
        >
          <Shield className="h-4 w-4" />
          {alreadyEnabled ? "2FA Opnieuw instellen" : "2FA Instellen"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Twee-factor Authenticatie</DialogTitle>
          <DialogDescription>
            {step === "password" && "Verifieer je wachtwoord om door te gaan."}
            {step === "intro" &&
              "Verbeter de beveiliging van je account met twee-factor authenticatie."}
            {step === "qrcode" && "Scan de QR-code met je authenticatie-app."}
            {step === "verify" &&
              "Voer de 6-cijferige code in van je authenticatie-app."}
            {step === "success" &&
              "Twee-factor authenticatie is succesvol ingeschakeld!"}
            {step === "backup" &&
              "Bewaar deze backup codes op een veilige plaats."}
          </DialogDescription>
        </DialogHeader>

        {step === "password" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Huidig Wachtwoord</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Voer je huidige wachtwoord in"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              {passwordError && (
                <p className="text-destructive text-sm">{passwordError}</p>
              )}
              <p className="text-muted-foreground text-sm">
                Voor de veiligheid moet je je wachtwoord verifiëren voordat je
                twee-factor authenticatie instelt.
              </p>
            </div>
          </div>
        )}

        {step === "intro" && (
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <QrCode className="h-6 w-6" />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm leading-none">
                  Authenticatie-app
                </p>
                <p className="text-muted-foreground text-sm">
                  Gebruik een authenticatie-app zoals Google Authenticator,
                  Authy of 1Password.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 rounded-md border p-4">
              <Shield className="h-6 w-6" />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm leading-none">
                  Verbeterde Beveiliging
                </p>
                <p className="text-muted-foreground text-sm">
                  Bescherm je account met een extra beveiligingslaag.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === "qrcode" && (
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="rounded-md bg-white p-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(totpURI)}&size=200x200`}
                  alt="QR Code"
                />
              </div>
            </div>

            <Tabs defaultValue="qrcode" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qrcode">QR-code</TabsTrigger>
                <TabsTrigger value="manual">Handmatige Invoer</TabsTrigger>
              </TabsList>
              <TabsContent value="qrcode" className="space-y-4">
                <p className="text-center text-muted-foreground text-sm">
                  Scan deze QR-code met je authenticatie-app
                </p>
              </TabsContent>
              <TabsContent value="manual" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={totpURI.split("secret=")[1]?.split("&")[0] || ""}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className={cn(copied && "text-green-500")}
                    disabled={loading}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm">
                  Voer deze sleutel handmatig in als je de QR-code niet kunt
                  scannen
                </p>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verificatiecode</Label>
              <Input
                id="verification-code"
                placeholder="Voer 6-cijferige code in"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
                  )
                }
                className="text-center font-mono text-lg tracking-widest"
                maxLength={6}
                disabled={loading}
              />
              <p className="text-muted-foreground text-sm">
                Voer de 6-cijferige code in van je authenticatie-app om de
                installatie te verifiëren
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center space-y-3 py-6">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center text-sm">
              Twee-factor authenticatie is succesvol ingeschakeld voor je
              account. Je moet nu een verificatiecode invoeren bij het inloggen.
            </p>
          </div>
        )}

        {step === "backup" && (
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground text-sm">
              Gebruik deze backup codes als je geen toegang hebt tot je
              authenticatie-app. Elke code kan slechts één keer worden gebruikt.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, index) => (
                <div
                  key={index}
                  className="rounded-md border p-2 text-center font-mono text-sm"
                >
                  {code}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={copyBackupCodes}
                disabled={loading}
              >
                {backupCodesCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {backupCodesCopied ? "Gekopieerd" : "Kopiëren"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={downloadBackupCodes}
                disabled={loading}
              >
                <Download className="h-4 w-4" />
                Downloaden
              </Button>
            </div>

            <p className="mt-2 text-muted-foreground text-sm">
              Bewaar deze codes op een veilige plaats. Als je je
              authenticatie-app verliest, kun je deze codes gebruiken om toegang
              te krijgen tot je account.
            </p>
          </div>
        )}

        <DialogFooter>
          {step === "intro" && (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Annuleren
              </Button>
              <Button onClick={() => setStep("password")} disabled={loading}>
                Doorgaan
              </Button>
            </>
          )}

          {step === "password" && (
            <>
              <Button
                variant="outline"
                onClick={() => setStep("intro")}
                disabled={loading}
              >
                Terug
              </Button>
              <Button
                onClick={enableTwoFactor}
                disabled={password.length < 6 || loading}
              >
                {loading ? "Bezig..." : "Doorgaan"}
              </Button>
            </>
          )}

          {step === "qrcode" && (
            <>
              <Button
                variant="outline"
                onClick={() => setStep("intro")}
                disabled={loading}
              >
                Terug
              </Button>
              <Button onClick={() => setStep("verify")} disabled={loading}>
                Doorgaan
              </Button>
            </>
          )}

          {step === "verify" && (
            <>
              <Button
                variant="outline"
                onClick={() => setStep("qrcode")}
                disabled={loading}
              >
                Terug
              </Button>
              <Button
                onClick={verifyTotp}
                disabled={verificationCode.length !== 6 || loading}
              >
                {loading ? "Verifiëren..." : "Verifiëren"}
              </Button>
            </>
          )}

          {step === "success" && (
            <Button onClick={() => setStep("backup")} disabled={loading}>
              Backup Codes Bekijken
            </Button>
          )}

          {step === "backup" && (
            <Button onClick={handleClose} disabled={loading}>
              Voltooien
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
