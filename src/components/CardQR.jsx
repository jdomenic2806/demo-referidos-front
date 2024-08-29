"use client";
import { useState } from "react";
// import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LinkIcon,
  QrCodeIcon,
  CopyIcon,
  CheckIcon,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function CardQR() {
  const [refCode, setRefCode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [userId, setUserId] = useState(0);
  const [qrCode, setQrCode] = useState(null);
  const { toast } = useToast();

  const generateRefCode = async () => {
    setIsGeneratingLink(true);
    // Simulamos un pequeño retraso para mostrar el estado de carga
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // crea un fetch a la API para generar un código de referencia
    const response = await fetch(
      "http://localhost:3010/api/v1/referenciados/generate-link",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: "axiosmobile" }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    toast({
      title: "Link generado",
      description: "El enlace se ha generado correctamente.",
    });

    // const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRefCode(result.referCode);
    setUserId(result.distributor.id);
    setShowQR(false);
    setIsCopied(false);
    setIsGeneratingLink(false);
  };

  const generateQR = async () => {
    setIsGeneratingQR(true);
    // Simulamos un pequeño retraso para mostrar el estado de carga
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // crea un fetch a la API para generar un código de referencia
    const response = await fetch(
      `http://localhost:3010/api/v1/referenciados/generate-qr-image/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ user: "axiosmobile" }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result.qrCode ", result.qrCode);

    toast({
      title: "QR generado",
      description: "El QR se ha generado correctamente.",
    });

    setQrCode(result.qrCode);
    setShowQR(true);
    setIsGeneratingQR(false);
  };

  const fullLink = `https://axiosmobile.mx/?ref=${refCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullLink);
      setIsCopied(true);
      toast({
        title: "Enlace copiado",
        description: "El enlace se ha copiado al portapapeles.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error al copiar",
        description:
          "No se pudo copiar el enlace. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generador de Enlace de Referencia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button
            onClick={generateRefCode}
            className="flex-1"
            disabled={isGeneratingLink}
          >
            {isGeneratingLink ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LinkIcon className="mr-2 h-4 w-4" />
            )}
            {isGeneratingLink ? "Generando..." : "Generar Enlace"}
          </Button>
          <Button
            onClick={generateQR}
            className="flex-1"
            disabled={!refCode || isGeneratingQR}
          >
            {isGeneratingQR ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <QrCodeIcon className="mr-2 h-4 w-4" />
            )}
            {isGeneratingQR ? "Generando..." : "Generar QR"}
          </Button>
        </div>
        {refCode && (
          <div className="space-y-2">
            <div className="flex">
              <Input value={fullLink} readOnly className="rounded-r-none" />
              <Button
                onClick={copyToClipboard}
                className="rounded-l-none"
                variant="secondary"
                disabled={isCopied}
              >
                {isCopied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {isCopied ? "Copiado" : "Copiar enlace"}
                </span>
              </Button>
            </div>
            {showQR && (
              <div className="flex justify-center flex-col align-middle items-center">
                {/* <QRCodeSVG value={fullLink} size={200} /> */}
                <h1>QR Generado desde backend</h1>
                <Image src={qrCode} alt="QR Code" width={200} height={200} />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
