// lib/pix.ts - Gerador de Payload Pix BR Code (Padrão Banco Central do Brasil / EMVCo)

function formatField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

function crc16(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generatePixPayload({
  key,
  name = "HANDHOLD OS",
  city = "BRASILIA",
  amount,
  transactionId = "***",
}: {
  key: string;
  name?: string;
  city?: string;
  amount?: number;
  transactionId?: string;
}): string {
  const cleanKey = key.trim();
  const cleanName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .slice(0, 25)
    .toUpperCase();
  const cleanCity = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .slice(0, 15)
    .toUpperCase();

  // 26 - Merchant Account Info
  const gui = formatField("00", "br.gov.bcb.pix");
  const keyField = formatField("01", cleanKey);
  const merchantAccountInfo = formatField("26", `${gui}${keyField}`);

  // 52 - Merchant Category Code
  const mcc = formatField("52", "0000");

  // 53 - Transaction Currency (986 = BRL)
  const currency = formatField("53", "986");

  // 54 - Amount
  let amountField = "";
  if (amount && amount > 0) {
    amountField = formatField("54", amount.toFixed(2));
  }

  // 58 - Country Code
  const country = formatField("58", "BR");

  // 59 - Merchant Name
  const merchantName = formatField("59", cleanName);

  // 60 - Merchant City
  const merchantCity = formatField("60", cleanCity);

  // 62 - Additional Data (TxID)
  const txId = formatField("05", transactionId || "***");
  const additionalData = formatField("62", txId);

  // 00 - Payload Format Indicator
  const payloadFormat = formatField("00", "01");

  const rawPayload = `${payloadFormat}${merchantAccountInfo}${mcc}${currency}${amountField}${country}${merchantName}${merchantCity}${additionalData}6304`;
  const checksum = crc16(rawPayload);

  return `${rawPayload}${checksum}`;
}
