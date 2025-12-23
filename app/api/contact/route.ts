import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Verificar que existe la API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY no está configurada");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { nombre, email, mensaje } = body;

    // Validar campos requeridos
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato del email no es válido" },
        { status: 400 }
      );
    }

    // Obtener el email de destino desde variables de entorno
    const toEmail = process.env.RESEND_TO_EMAIL || "paabbloormpers@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // Sanitizar inputs para prevenir XSS
    const sanitize = (str: string) => {
      return str
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
    };

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Nuevo contacto de ${sanitize(nombre.trim())}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${sanitize(nombre.trim())}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitize(email.trim())}">${sanitize(email.trim())}</a></p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Mensaje:</h3>
            <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${sanitize(mensaje.trim())}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de Certifica Ingeniería.</p>
            <p>Puedes responder directamente a este correo para contactar con ${sanitize(nombre.trim())}.</p>
          </div>
        </div>
      `,
      reply_to: email.trim(),
    });

    if (error) {
      console.error("Error al enviar email con Resend:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: "Error al enviar el mensaje. Inténtalo de nuevo.",
          details: process.env.NODE_ENV === "development" ? error : undefined
        },
        { status: 500 }
      );
    }

    console.log("Email enviado correctamente:", data);

    return NextResponse.json(
      { success: true, message: "Mensaje enviado correctamente" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error en API de contacto:", error);
    return NextResponse.json(
      { 
        error: "Error interno del servidor",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

