import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
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
    const toEmail = process.env.RESEND_TO_EMAIL || "administración@certificaingenieria.com";

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@certificaingenieria.com",
      to: [toEmail],
      subject: `Nuevo contacto de ${nombre.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${nombre.trim()}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Mensaje:</h3>
            <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${mensaje.trim()}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de Certifica Ingeniería.</p>
            <p>Puedes responder directamente a este correo para contactar con ${nombre.trim()}.</p>
          </div>
        </div>
      `,
      replyTo: email.trim(),
    });

    if (error) {
      console.error("Error al enviar email con Resend:", error);
      return NextResponse.json(
        { error: "Error al enviar el mensaje. Inténtalo de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Mensaje enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en API de contacto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

