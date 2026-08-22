import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod/v4";
import { PLATFORMS, FORMATS } from "@/types";

export const runtime = "nodejs";

const TaskExtractionSchema = z.object({
  title: z.string().describe("Título curto e claro para o conteúdo/tarefa"),
  clientName: z
    .string()
    .nullable()
    .describe("Nome do cliente mencionado, deve bater com um dos clientes cadastrados fornecidos"),
  platform: z.enum(PLATFORMS).nullable(),
  format: z.enum(FORMATS).nullable(),
  scheduledAt: z
    .string()
    .nullable()
    .describe("Data e hora em ISO 8601 já calculada a partir de referências relativas (ex: 'sexta-feira'), ou null se não houver menção de data"),
});

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Integração com IA não configurada. Defina ANTHROPIC_API_KEY no servidor (veja o README)." },
      { status: 501 }
    );
  }

  let body: { text?: string; clientNames?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const text = body.text?.trim();
  if (!text) {
    return NextResponse.json({ error: "Nenhum texto fornecido." }, { status: 400 });
  }
  const clientNames = Array.isArray(body.clientNames) ? body.clientNames : [];

  const client = new Anthropic();
  const now = new Date().toISOString();

  try {
    const message = await client.messages.parse({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: [
        "Você extrai tarefas de produção de conteúdo a partir de fala transcrita, para um sistema de gestão de conteúdo de social media.",
        `A data e hora atuais são: ${now} (use isso para calcular datas relativas como "sexta-feira" ou "amanhã").`,
        clientNames.length > 0
          ? `Clientes cadastrados: ${clientNames.join(", ")}. Se um desses nomes for mencionado (mesmo que parcialmente ou com pequena variação), retorne o nome exatamente como está na lista.`
          : "Nenhum cliente cadastrado foi informado.",
        "Se alguma informação não for mencionada no texto, retorne null para o campo correspondente.",
      ].join("\n"),
      messages: [{ role: "user", content: text }],
      output_config: {
        format: zodOutputFormat(TaskExtractionSchema),
      },
    });

    if (message.stop_reason === "refusal") {
      return NextResponse.json({ error: "O pedido não pôde ser processado." }, { status: 422 });
    }

    if (!message.parsed_output) {
      return NextResponse.json({ error: "Não foi possível interpretar a resposta da IA." }, { status: 502 });
    }

    return NextResponse.json(message.parsed_output);
  } catch (error) {
    const description = error instanceof Anthropic.APIError ? error.message : "Erro ao conectar com a IA.";
    return NextResponse.json({ error: description }, { status: 502 });
  }
}
