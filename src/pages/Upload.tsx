import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, FileCheck, Download, Save } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { parseCSV, simulateAnalysis } from '@/lib/analysis';
import { saveAnalysis } from '@/lib/storage';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import jsPDF from 'jspdf';

const Upload = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [result, setResult] = useState<any>(null);
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setAnalyzing(true);
    setProgress(0);

    // Step 1: Validating
    setCurrentStep('Validating file...');
    setProgress(25);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Step 2: Parsing
    setCurrentStep('Parsing CSV data...');
    setProgress(50);
    const data = await parseCSV(file);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Step 3: Scanning
    setCurrentStep('Scanning for anomalies...');
    setProgress(75);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 4: Generating
    setCurrentStep('Generating insights...');
    setProgress(90);
    const analysis = await simulateAnalysis(data);
    
    setProgress(100);
    setCurrentStep('Complete!');
    await new Promise(resolve => setTimeout(resolve, 500));

    setResult(analysis);
    setAnalyzing(false);
    toast.success('Analysis complete!');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
  });

  const handleSaveToHistory = () => {
    if (result) {
      saveAnalysis({
        fileName,
        ...result,
      });
      toast.success('Saved to upload history!');
      navigate('/uploads');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('DataGuard Analysis Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`File: ${fileName}`, 20, 35);
    doc.text(`Rows: ${result.rows}`, 20, 45);
    doc.text(`Columns: ${result.columns}`, 20, 55);
    doc.text(`Prediction: ${result.prediction}`, 20, 65);
    doc.text(`Attack Type: ${result.attackType}`, 20, 75);
    doc.text(`Confidence: ${(result.confidence * 100).toFixed(2)}%`, 20, 85);
    
    doc.text('Top Features:', 20, 100);
    result.topFeatures.forEach((f: any, i: number) => {
      doc.text(`${i + 1}. ${f.name}: ${(f.importance * 100).toFixed(2)}%`, 30, 110 + i * 10);
    });

    doc.save(`dataguard-report-${Date.now()}.pdf`);
    toast.success('PDF downloaded!');
  };

  const COLORS = ['#E50914', '#00CFEA', '#FF6B6B', '#4ECDC4', '#FFE66D'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AIAssistant />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-8 text-gradient"
          >
            Upload & Analyze Dataset
          </motion.h1>

          <AnimatePresence mode="wait">
            {!result && !analyzing && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div
                  className="glass glow-cyan p-12 rounded-xl text-center cursor-pointer"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <UploadIcon className="w-20 h-20 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">
                    {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file'}
                  </h3>
                  <p className="text-muted-foreground">or click to browse</p>
                </div>
              </motion.div>
            )}

            {analyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass glow-cyan p-12 rounded-xl"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-4">{currentStep}</h3>
                  <Progress value={progress} className="h-3" />
                  <p className="text-muted-foreground mt-2">{progress}%</p>
                </div>
                
                <div className="space-y-2 text-muted-foreground">
                  <p className={progress >= 25 ? 'text-accent' : ''}>✓ Validating file format</p>
                  <p className={progress >= 50 ? 'text-accent' : ''}>✓ Parsing CSV data</p>
                  <p className={progress >= 75 ? 'text-accent' : ''}>✓ Scanning for anomalies</p>
                  <p className={progress >= 90 ? 'text-accent' : ''}>✓ Generating insights</p>
                </div>
              </motion.div>
            )}

            {result && (
              <div
                key="results"
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass p-6 rounded-xl text-center">
                    <p className="text-muted-foreground mb-2">Total Rows</p>
                    <p className="text-4xl font-bold text-foreground">{result.rows.toLocaleString()}</p>
                  </div>
                  <div className="glass p-6 rounded-xl text-center">
                    <p className="text-muted-foreground mb-2">Total Columns</p>
                    <p className="text-4xl font-bold text-foreground">{result.columns}</p>
                  </div>
                  <div className="glass p-6 rounded-xl text-center">
                    <p className="text-muted-foreground mb-2">Confidence</p>
                    <p className="text-4xl font-bold text-accent">{(result.confidence * 100).toFixed(2)}%</p>
                  </div>
                </div>

                {/* Prediction Card */}
                <div className="glass glow-red p-8 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">Prediction Result</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-1">Classification</p>
                      <p className="text-3xl font-bold text-primary">{result.prediction}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Attack Type</p>
                      <p className="text-2xl font-semibold">{result.attackType}</p>
                    </div>
                    <div className="bg-primary/20 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bar Chart */}
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Top Features</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={result.topFeatures}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" hide />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="importance" fill="#E50914" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Feature Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={result.topFeatures}
                          dataKey="importance"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {result.topFeatures.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            borderRadius: '8px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button onClick={handleDownloadPDF} size="lg" className="glow-red">
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF Report
                  </Button>
                  <Button onClick={handleSaveToHistory} size="lg" variant="outline">
                    <Save className="w-5 h-5 mr-2" />
                    Save to History
                  </Button>
                  <Button onClick={() => setResult(null)} size="lg" variant="outline">
                    <UploadIcon className="w-5 h-5 mr-2" />
                    Upload New File
                  </Button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Upload;
