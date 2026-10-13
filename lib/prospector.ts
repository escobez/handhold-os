// lib/prospector.ts - Motor TRCP de Alta Performance com Overpass e Detecção de Websites

export interface CommercialNiche {
  id: string;
  label: string;
  categoryGroup: string;
  tags: { key: string; value: string }[];
}

export const COMMERCIAL_NICHES: CommercialNiche[] = [
  {
    id: "padarias",
    label: "Padarias & Confeitarias",
    categoryGroup: "Alimentação",
    tags: [{ key: "shop", value: "bakery" }],
  },
  {
    id: "restaurantes",
    label: "Restaurantes & Gastronomia",
    categoryGroup: "Alimentação",
    tags: [{ key: "amenity", value: "restaurant" }],
  },
  {
    id: "cafes",
    label: "Cafés & Bistrôs",
    categoryGroup: "Alimentação",
    tags: [{ key: "amenity", value: "cafe" }],
  },
  {
    id: "pizzarias",
    label: "Pizzarias & Hamburguerias",
    categoryGroup: "Alimentação",
    tags: [{ key: "amenity", value: "fast_food" }],
  },
  {
    id: "dentistas",
    label: "Clínicas Odontológicas",
    categoryGroup: "Saúde",
    tags: [{ key: "amenity", value: "dentist" }, { key: "healthcare", value: "dentist" }],
  },
  {
    id: "clinicas_medicas",
    label: "Clínicas Médicas & Consultórios",
    categoryGroup: "Saúde",
    tags: [{ key: "amenity", value: "clinic" }, { key: "amenity", value: "doctors" }],
  },
  {
    id: "academias",
    label: "Academias & Fitness",
    categoryGroup: "Bem-estar",
    tags: [{ key: "leisure", value: "fitness_centre" }],
  },
  {
    id: "saloes_barbearias",
    label: "Salões de Beleza & Barbearias",
    categoryGroup: "Beleza",
    tags: [{ key: "shop", value: "hairdresser" }, { key: "shop", value: "beauty" }],
  },
  {
    id: "pet_shops",
    label: "Pet Shops & Veterinárias",
    categoryGroup: "Pets",
    tags: [{ key: "shop", value: "pet" }, { key: "amenity", value: "veterinary" }],
  },
  {
    id: "oficinas",
    label: "Oficinas Mecânicas & Auto Centers",
    categoryGroup: "Automotivo",
    tags: [{ key: "shop", value: "car_repair" }],
  },
  {
    id: "advocacia",
    label: "Escritórios de Advocacia",
    categoryGroup: "Serviços B2B",
    tags: [{ key: "office", value: "lawyer" }],
  },
  {
    id: "contabilidade",
    label: "Contabilidade & Financeiro",
    categoryGroup: "Serviços B2B",
    tags: [{ key: "office", value: "accountant" }, { key: "office", value: "financial" }],
  },
  {
    id: "imobiliarias",
    label: "Imobiliárias & Corretores",
    categoryGroup: "Serviços",
    tags: [{ key: "office", value: "estate_agent" }],
  },
  {
    id: "farmacias",
    label: "Farmácias & Drogarias",
    categoryGroup: "Saúde",
    tags: [{ key: "amenity", value: "pharmacy" }],
  },
  {
    id: "supermercados",
    label: "Supermercados & Empórios",
    categoryGroup: "Varejo",
    tags: [{ key: "shop", value: "supermarket" }],
  },
  {
    id: "boutiques",
    label: "Lojas de Roupas & Boutiques",
    categoryGroup: "Varejo",
    tags: [{ key: "shop", value: "clothes" }, { key: "shop", value: "boutique" }],
  },
  {
    id: "oticas",
    label: "Óticas & Acessórios",
    categoryGroup: "Varejo",
    tags: [{ key: "shop", value: "optician" }],
  },
  {
    id: "hoteis",
    label: "Hotéis & Pousadas",
    categoryGroup: "Turismo",
    tags: [{ key: "tourism", value: "hotel" }, { key: "tourism", value: "guest_house" }],
  },
  {
    id: "escolas",
    label: "Escolas, Cursos & Idiomas",
    categoryGroup: "Educação",
    tags: [{ key: "amenity", value: "language_school" }, { key: "amenity", value: "school" }],
  },
  {
    id: "bares",
    label: "Bares & Choperias",
    categoryGroup: "Alimentação",
    tags: [{ key: "amenity", value: "bar" }, { key: "amenity", value: "pub" }],
  },
];

// Dicionário com Bounding Boxes precisos das principais cidades brasileiras
export const PRESET_CITIES: Record<string, { label: string; state: string; bbox: [number, number, number, number] }> = {
  "Belo Horizonte, MG": {
    label: "Belo Horizonte, MG",
    state: "MG",
    bbox: [-19.98, -44.02, -19.82, -43.90],
  },
  "São Paulo, SP": {
    label: "São Paulo, SP",
    state: "SP",
    bbox: [-23.65, -46.75, -23.48, -46.55],
  },
  "Rio de Janeiro, RJ": {
    label: "Rio de Janeiro, RJ",
    state: "RJ",
    bbox: [-22.99, -43.35, -22.85, -43.15],
  },
  "Curitiba, PR": {
    label: "Curitiba, PR",
    state: "PR",
    bbox: [-25.52, -49.35, -25.38, -49.20],
  },
  "Florianópolis, SC": {
    label: "Florianópolis, SC",
    state: "SC",
    bbox: [-27.65, -48.58, -27.50, -48.45],
  },
  "Porto Alegre, RS": {
    label: "Porto Alegre, RS",
    state: "RS",
    bbox: [-30.12, -51.26, -29.98, -51.15],
  },
  "Brasília, DF": {
    label: "Brasília, DF",
    state: "DF",
    bbox: [-15.86, -47.96, -15.72, -47.84],
  },
  "Goiânia, GO": {
    label: "Goiânia, GO",
    state: "GO",
    bbox: [-16.74, -49.33, -16.63, -49.20],
  },
  "Salvador, BA": {
    label: "Salvador, BA",
    state: "BA",
    bbox: [-12.99, -38.53, -12.87, -38.38],
  },
  "Fortaleza, CE": {
    label: "Fortaleza, CE",
    state: "CE",
    bbox: [-3.83, -38.60, -3.70, -38.45],
  },
  "Recife, PE": {
    label: "Recife, PE",
    state: "PE",
    bbox: [-8.13, -34.96, -8.01, -34.86],
  },
  "Campinas, SP": {
    label: "Campinas, SP",
    state: "SP",
    bbox: [-22.97, -47.12, -22.84, -47.01],
  },
  "Ribeirão Preto, SP": {
    label: "Ribeirão Preto, SP",
    state: "SP",
    bbox: [-21.23, -47.86, -21.14, -47.76],
  },
  "Santos, SP": {
    label: "Santos, SP",
    state: "SP",
    bbox: [-23.98, -46.36, -23.92, -46.30],
  },
  "Balneário Camboriú, SC": {
    label: "Balneário Camboriú, SC",
    state: "SC",
    bbox: [-27.02, -48.65, -26.96, -48.59],
  },
  "Joinville, SC": {
    label: "Joinville, SC",
    state: "SC",
    bbox: [-26.35, -48.88, -26.25, -48.80],
  },
  "Maringá, PR": {
    label: "Maringá, PR",
    state: "PR",
    bbox: [-23.45, -51.96, -23.38, -51.90],
  },
  "Londrina, PR": {
    label: "Londrina, PR",
    state: "PR",
    bbox: [-23.35, -51.20, -23.27, -51.13],
  },
  "Uberlândia, MG": {
    label: "Uberlândia, MG",
    state: "MG",
    bbox: [-18.96, -48.33, -18.88, -48.24],
  },
};

const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter",
];

// Geocodificação em tempo real caso a cidade informada não esteja no preset
export async function geocodeCity(query: string): Promise<[number, number, number, number] | null> {
  const clean = query.trim();
  if (PRESET_CITIES[clean]) {
    return PRESET_CITIES[clean].bbox;
  }

  // Tenta match parcial
  for (const [key, val] of Object.entries(PRESET_CITIES)) {
    if (key.toLowerCase().includes(clean.toLowerCase()) || clean.toLowerCase().includes(key.toLowerCase())) {
      return val.bbox;
    }
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ", Brazil")}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "HandholdTRCP/1.0 (contact@handhold.io)" },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const b = data[0].boundingbox; // [latMin, latMax, lonMin, lonMax]
      return [parseFloat(b[0]), parseFloat(b[2]), parseFloat(b[1]), parseFloat(b[3])];
    }
  } catch (err) {
    console.warn("Geocodificação Nominatim falhou ou timeout, usando fallback padrão:", err);
  }

  // Fallback padrão: região central de Belo Horizonte
  return [-19.95, -43.96, -19.91, -43.92];
}

// Verifica status real de um website
export async function verifyWebsiteStatus(url: string): Promise<{
  status: "active" | "broken" | "none";
  httpCode: number | null;
}> {
  if (!url || typeof url !== "string" || !url.trim()) {
    return { status: "none", httpCode: null };
  }

  let target = url.trim();
  if (!target.startsWith("http://") && !target.startsWith("https://")) {
    target = "https://" + target;
  }

  try {
    const res = await fetch(target, {
      method: "HEAD",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(3500),
      redirect: "follow",
    });

    if (res.ok || (res.status >= 200 && res.status < 400)) {
      return { status: "active", httpCode: res.status };
    }
    return { status: "broken", httpCode: res.status };
  } catch (err: any) {
    // Tenta fallback com http:// se https:// falhou
    if (target.startsWith("https://")) {
      try {
        const httpTarget = target.replace("https://", "http://");
        const res2 = await fetch(httpTarget, {
          method: "HEAD",
          signal: AbortSignal.timeout(2500),
        });
        if (res2.ok || (res2.status >= 200 && res2.status < 400)) {
          return { status: "active", httpCode: res2.status };
        }
      } catch (e) {}
    }
    return { status: "broken", httpCode: 0 };
  }
}

// Executa mineração real via Overpass com rotação resiliente de espelhos
export async function mineOverpassBusinesses(
  bbox: [number, number, number, number],
  niche: CommercialNiche,
  limit: number = 30
): Promise<any[]> {
  const [south, west, north, east] = bbox;

  // Monta as cláusulas de tag
  const statements = niche.tags
    .map((t) => `nwr(${south},${west},${north},${east})["${t.key}"="${t.value}"]["name"];`)
    .join("\n");

  const query = `[out:json][timeout:20];(\n${statements}\n);out center tags ${limit};`;

  let lastError: Error | null = null;

  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const res = await fetch(mirror, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "HandholdTRCP/1.0 (https://github.com/escobez/handhold-os)",
        },
        body: "data=" + encodeURIComponent(query),
        signal: AbortSignal.timeout(12000),
      });

      if (!res.ok) {
        throw new Error(`Mirror ${mirror} retornou HTTP ${res.status}`);
      }

      const json = await res.json();
      if (Array.isArray(json.elements) && json.elements.length > 0) {
        return json.elements;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Falha no espelho ${mirror}: ${err.message}. Tentando próximo espelho...`);
    }
  }

  console.warn("Todos os espelhos Overpass falharam ou não encontraram alvos:", lastError?.message);
  return [];
}
