import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, Zap, Brain, Lock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Lock,
      title: 'Secure Upload',
      description: 'End-to-end encryption for your sensitive datasets',
    },
    {
      icon: Zap,
      title: 'Real-Time DDoS Detection',
      description: 'Instant analysis and threat identification',
    },
    {
      icon: TrendingUp,
      title: 'Smart Insights',
      description: 'AI-powered analytics and actionable recommendations',
    },
    {
      icon: Brain,
      title: 'AI Assistant',
      description: '24/7 intelligent support for your security needs',
    },
  ];

  const aboutCards = [
    {
      title: 'Easy Upload',
      description: 'Drag and drop your CSV files for instant analysis',
    },
    {
      title: 'Quick Analysis',
      description: 'Get results in seconds with our advanced AI algorithms',
    },
    {
      title: 'Secure & Reliable',
      description: 'Your data is processed locally and never permanently stored',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AIAssistant />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Welcome to <span className="text-gradient">DataGuard</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Analyze Your Data with AI Precision
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => navigate('/upload')}
                size="lg"
                className="glow-red text-lg px-8"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Dataset
              </Button>
              <Button
                onClick={() => navigate('/about')}
                size="lg"
                variant="outline"
                className="text-lg px-8"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Powerful Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-xl hover:glow-cyan transition-all cursor-pointer"
              >
                <feature.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-dark">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">About DataGuard</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              DataGuard is your trusted partner in network security analysis. We leverage
              cutting-edge AI to detect and prevent DDoS attacks before they impact your systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass glow-red p-8 rounded-xl text-center"
              >
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy First Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="glass glow-cyan p-12 rounded-xl max-w-4xl mx-auto"
          >
            <Lock className="w-20 h-20 text-accent mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Privacy First</h2>
            <p className="text-lg text-muted-foreground">
              Your data security is our top priority. All analysis happens in-memory, and we never
              permanently store your sensitive information. What happens in DataGuard, stays in DataGuard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground mb-2">
            © 2025 DataGuard. All rights reserved. | Contact: dataguard2025@gmail.com
          </p>
          <p className="text-xs text-muted-foreground">
            Protecting networks with AI-powered security analysis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
