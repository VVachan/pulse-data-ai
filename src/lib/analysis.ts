import Papa from 'papaparse';

export interface CSVData {
  headers: string[];
  rows: any[][];
  rowCount: number;
  columnCount: number;
}

export const parseCSV = (file: File): Promise<CSVData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        const headers = results.data[0] as string[];
        const rows = results.data.slice(1) as any[][];
        
        resolve({
          headers,
          rows: rows.filter(row => row.some(cell => cell !== '')),
          rowCount: rows.length - 1,
          columnCount: headers.length,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const simulateAnalysis = async (data: CSVData) => {
  // Simulate DDoS detection analysis
  await new Promise(resolve => setTimeout(resolve, 2000));

  const attackTypes = ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'DNS Amplification', 'Normal Traffic'];
  const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
  const isAttack = randomAttack !== 'Normal Traffic';

  const topFeatures = [
    { name: 'Flow Duration', importance: 0.25 },
    { name: 'Total Fwd Packets', importance: 0.23 },
    { name: 'Fwd Packet Length Mean', importance: 0.22 },
    { name: 'Bwd Packet Length Mean', importance: 0.20 },
    { name: 'Flow Packets/s', importance: 0.18 },
  ];

  return {
    rows: data.rowCount,
    columns: data.columnCount,
    prediction: isAttack ? 'DDoS Attack' : 'Normal',
    attackType: randomAttack,
    confidence: 0.92 + Math.random() * 0.07,
    topFeatures,
  };
};
