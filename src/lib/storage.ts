export interface AnalysisResult {
  id: string;
  fileName: string;
  uploadDate: string;
  rows: number;
  columns: number;
  prediction: string;
  attackType: string;
  confidence: number;
  topFeatures: { name: string; importance: number }[];
}

const UPLOADS_KEY = 'dataguard_uploads';

export const saveAnalysis = (result: Omit<AnalysisResult, 'id' | 'uploadDate'>): AnalysisResult => {
  const uploads = getUploads();
  const newResult: AnalysisResult = {
    ...result,
    id: Math.random().toString(36).substr(2, 9),
    uploadDate: new Date().toISOString(),
  };
  
  uploads.unshift(newResult);
  localStorage.setItem(UPLOADS_KEY, JSON.stringify(uploads));
  return newResult;
};

export const getUploads = (): AnalysisResult[] => {
  const uploads = localStorage.getItem(UPLOADS_KEY);
  return uploads ? JSON.parse(uploads) : [];
};

export const deleteUpload = (id: string) => {
  const uploads = getUploads().filter(u => u.id !== id);
  localStorage.setItem(UPLOADS_KEY, JSON.stringify(uploads));
};
