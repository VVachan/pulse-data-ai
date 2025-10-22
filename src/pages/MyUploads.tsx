import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Trash2, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import { Button } from '@/components/ui/button';
import { getUploads, deleteUpload } from '@/lib/storage';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const MyUploads = () => {
  const [uploads, setUploads] = useState(getUploads());

  const handleDelete = (id: string) => {
    deleteUpload(id);
    setUploads(getUploads());
    toast.success('Upload deleted');
  };

  const handleRefresh = () => {
    setUploads(getUploads());
    toast.success('Refreshed');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AIAssistant />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gradient"
            >
              My Uploads
            </motion.h1>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {uploads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-xl text-center"
            >
              <FileText className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No uploads yet</h3>
              <p className="text-muted-foreground">
                Upload a dataset to see your analysis history
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Attack Type</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell className="font-medium">{upload.fileName}</TableCell>
                      <TableCell>
                        {new Date(upload.uploadDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            upload.prediction.includes('Attack')
                              ? 'bg-primary/20 text-primary'
                              : 'bg-accent/20 text-accent'
                          }`}
                        >
                          {upload.prediction}
                        </span>
                      </TableCell>
                      <TableCell>{upload.attackType}</TableCell>
                      <TableCell>{(upload.confidence * 100).toFixed(2)}%</TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleDelete(upload.id)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyUploads;
