import { motion } from 'framer-motion';
import { Lock, Shield, Eye, Trash } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';

const Privacy = () => {
  const policies = [
    {
      icon: Lock,
      title: 'Data Privacy',
      content:
        'DataGuard does not permanently store your uploaded datasets. All analysis happens in-memory and data is erased immediately after your session ends.',
    },
    {
      icon: Shield,
      title: 'Secure Processing',
      content:
        'All data processing occurs locally in your browser. We use client-side computation to ensure your sensitive information never leaves your device.',
    },
    {
      icon: Eye,
      title: 'No Tracking',
      content:
        'We do not track, collect, or share any personally identifiable information. Your privacy is our priority, and we operate on a zero-data-collection policy.',
    },
    {
      icon: Trash,
      title: 'Session-Based Storage',
      content:
        'Analysis results are stored in your browser\'s local storage only. You have full control to delete this data at any time by clearing your browser storage.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AIAssistant />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 text-gradient">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your data security and privacy are at the core of everything we do at DataGuard.
            </p>
          </motion.div>

          <div className="space-y-6 mb-12">
            {policies.map((policy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <policy.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{policy.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass glow-cyan p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
            <p className="text-muted-foreground text-center">
              If you have any questions or concerns about our privacy practices, please contact us at:
            </p>
            <p className="text-center text-accent font-semibold mt-4">dataguard2025@gmail.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>Last updated: January 2025</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
