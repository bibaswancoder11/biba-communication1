import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

// Parse JSON payloads
app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in your Settings > Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-memory queue to store callback and inquiry logs on the server
interface ServerInquiryLog {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "phone" | "email";
  selectedServiceNames: string[];
  message: string;
  submittedAt: string;
  status: string;
  aiDraftedEmail?: {
    subject: string;
    body: string;
  };
  aiDraftedSms?: string;
  logs: string[];
}

const serverQueue: ServerInquiryLog[] = [];

// API: Get current server queue status
app.get("/api/queue", (req, res) => {
  res.json({ queue: serverQueue });
});

// API: Process Callback and Inquiry Request
app.post("/api/callback", async (req, res) => {
  const { fullName, email, phone, preferredContact, selectedServiceNames, message } = req.body;
  const logs: string[] = [];
  logs.push(`[${new Date().toLocaleTimeString()}] Received callback queue request for ${fullName}.`);

  if (!fullName) {
    res.status(400).json({ error: "Full name is required." });
    return;
  }

  let aiDraftedEmail = {
    subject: "Biba Communication Inquiry Support",
    body: `Dear ${fullName},\n\nThank you for reaching out to Biba Communication. We have received your request for services and our advisor will be in touch with you shortly.`,
  };
  let aiDraftedSms = `Hello ${fullName}, Biba Communication has added you to our active callback queue. An advisor will call you at ${phone} shortly.`;

  // 1. Generate professional content using Gemini AI
  try {
    logs.push(`[${new Date().toLocaleTimeString()}] Invoking Gemini AI model "gemini-3.5-flash" to draft suitable client response...`);
    const ai = getGeminiClient();
    
    const prompt = `
      You are an expert financial consultant and copywriter for Biba Communication, based in Kolkata, West Bengal.
      We provide high-quality and affordable Accounting, Taxation, GST returns, Trade Licenses, Land Revenue (Khajna), PAN cards, and Property Tax services.
      
      A customer has submitted a consultation/callback request. Here are the details:
      Customer Name: ${fullName}
      Preferred contact channel: ${preferredContact}
      Phone: ${phone || "Not provided"}
      Email: ${email || "Not provided"}
      Selected Services: ${selectedServiceNames && selectedServiceNames.length > 0 ? selectedServiceNames.join(", ") : "General Financial Consultation"}
      Client's Notes/Message: "${message || "No specific comments provided."}"
      
      Please generate:
      1. A professional, highly tailored, polite, and welcoming email subject line and body to send to the client. Keep the tone professional, helpful, reassuring, and precise. Mention Kolkata/West Bengal if helpful, and address their specific query.
      2. A short SMS / Telephony alert text (max 150 characters) to notify the owner of the company (+91 7980224837) about this new lead.
      
      Format the response strictly as a JSON object with these keys:
      "emailSubject": string,
      "emailBody": string,
      "smsNotification": string
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text?.trim() || "";
    if (text) {
      try {
        const parsed = JSON.parse(text);
        if (parsed.emailSubject && parsed.emailBody) {
          aiDraftedEmail = {
            subject: parsed.emailSubject,
            body: parsed.emailBody,
          };
          logs.push(`[${new Date().toLocaleTimeString()}] Successfully crafted customized client email reply using Gemini AI.`);
        }
        if (parsed.smsNotification) {
          aiDraftedSms = parsed.smsNotification;
          logs.push(`[${new Date().toLocaleTimeString()}] Successfully drafted SMS alert notification using Gemini AI.`);
        }
      } catch (err) {
        logs.push(`[${new Date().toLocaleTimeString()}] Error parsing JSON from Gemini response. Falling back to template. Error: ${err}`);
      }
    }
  } catch (error: any) {
    logs.push(`[${new Date().toLocaleTimeString()}] Gemini AI generation skipped or error occurred: ${error.message}`);
  }

  let deliveryStatus = "Simulated Queue";

  // 2. Handle actual Email transmission if SMTP is configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const ownerEmail = process.env.OWNER_EMAIL || "bibacommunication22@gmail.com";

  if (preferredContact === "email" && smtpHost && smtpUser && smtpPass) {
    try {
      logs.push(`[${new Date().toLocaleTimeString()}] SMTP configuration detected. Preparing email transmission to client: ${email}...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "587"),
        secure: smtpPort === "465",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Send reply email to user, and carbon-copy the owner
      await transporter.sendMail({
        from: `"Biba Communication" <${smtpUser}>`,
        to: email,
        cc: ownerEmail,
        subject: aiDraftedEmail.subject,
        text: aiDraftedEmail.body,
      });

      deliveryStatus = "Email Transmitted Successfully";
      logs.push(`[${new Date().toLocaleTimeString()}] Email sent successfully via SMTP server to ${email}. CC copy dispatched to ${ownerEmail}.`);
    } catch (err: any) {
      deliveryStatus = "Email Transmission Failed";
      logs.push(`[${new Date().toLocaleTimeString()}] SMTP delivery failed: ${err.message}`);
    }
  } else if (preferredContact === "email") {
    logs.push(`[${new Date().toLocaleTimeString()}] SMTP credentials not set. Simulated Email queued on Biba system.`);
    logs.push(`[${new Date().toLocaleTimeString()}] To activate real emails, set 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', and 'SMTP_PASS' environment variables.`);
  }

  // 3. Handle actual Phone Call / SMS notification if Twilio is configured
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const ownerPhone = process.env.OWNER_PHONE || "+917980224837"; // Company primary contact

  if (preferredContact === "phone" && twilioSid && twilioToken && twilioPhone) {
    try {
      logs.push(`[${new Date().toLocaleTimeString()}] Twilio API credentials detected. Directing callback dispatch alert to company phone...`);
      
      // Use standard Node fetch to make Twilio SMS API call without requiring the heavy SDK
      const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64");
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;

      const params = new URLSearchParams();
      params.append("To", ownerPhone);
      params.append("From", twilioPhone);
      params.append("Body", `Biba Callback Alert: Call ${fullName} (${phone}). Services: ${selectedServiceNames?.join(", ") || "General"}. Msg: ${message || "None"}`);

      const response = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (response.ok) {
        deliveryStatus = "Phone Alert Sent via Twilio";
        logs.push(`[${new Date().toLocaleTimeString()}] Twilio call dispatch alert dispatched successfully to owner's phone (${ownerPhone}).`);
      } else {
        const errorData = await response.json();
        deliveryStatus = "Twilio Call Dispatch Alert Failed";
        logs.push(`[${new Date().toLocaleTimeString()}] Twilio API response error: ${errorData.message}`);
      }
    } catch (err: any) {
      deliveryStatus = "Twilio Dispatch Connection Failed";
      logs.push(`[${new Date().toLocaleTimeString()}] Twilio dispatch call failed: ${err.message}`);
    }
  } else if (preferredContact === "phone") {
    logs.push(`[${new Date().toLocaleTimeString()}] Telephony credentials not set. Simulated phone call callback queued.`);
    logs.push(`[${new Date().toLocaleTimeString()}] To activate real SMS/Call alerts, set 'TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', and 'TWILIO_PHONE_NUMBER' environment variables.`);
  }

  // Save in server queue
  const serverLog: ServerInquiryLog = {
    id: "ser-" + Date.now(),
    fullName,
    email,
    phone,
    preferredContact,
    selectedServiceNames: selectedServiceNames || [],
    message: message || "",
    submittedAt: new Date().toLocaleString(),
    status: deliveryStatus,
    aiDraftedEmail,
    aiDraftedSms,
    logs,
  };

  serverQueue.unshift(serverLog);

  res.json({
    success: true,
    status: deliveryStatus,
    aiDraftedEmail,
    aiDraftedSms,
    logs,
    inquiry: serverLog,
  });
});

// Serve assets based on environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
