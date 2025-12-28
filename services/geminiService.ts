
import { GoogleGenAI } from "@google/genai";
import { AdData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateAdDescription = async (data: AdData): Promise<string> => {
  const prompt = `
    Você é um especialista em marketing e vendas de alta conversão para marketplaces (Mercado Livre, OLX, Facebook Marketplace).
    Sua tarefa é criar uma descrição de produto altamente persuasiva e organizada.

    INFORMAÇÕES DO PRODUTO:
    - Nome: ${data.productName}
    - Condição: ${data.condition}
    - Destaques/Características: ${data.tags.join(", ")}

    REQUISITOS DA DESCRIÇÃO:
    1. Título Chamativo: Use o nome do produto e uma característica forte.
    2. Gancho de Venda: Comece com os benefícios, não apenas funcionalidades.
    3. Tópicos de Características: Use listas (bullet points) claros e emojis.
    4. Detalhes de Estado: Seja honesto sobre a condição citada (${data.condition}).
    5. Chamada para Ação (CTA): Finalize encorajando o contato imediato ou compra.
    6. Formatação: Use negritos (Markdown **) para destacar partes importantes.
    7. Tom: Profissional, amigável e direto.

    Responda APENAS com o texto da descrição do anúncio.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "Desculpe, não conseguimos gerar sua descrição agora. Tente novamente.";
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw new Error("Falha na comunicação com a IA.");
  }
};
