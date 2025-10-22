import { motion } from 'framer-motion';
import { Shield, Target, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';

const About = () => {
  const cards = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description:
        'Our cutting-edge algorithms analyze network traffic patterns to identify and prevent DDoS attacks before they cause damage. We use machine learning models trained on millions of data points.',
    },
    {
      icon: Target,
      title: 'Precise Detection',
      description:
        'With accuracy rates exceeding 95%, DataGuard can distinguish between legitimate traffic spikes and malicious attack patterns. Our AI continuously learns and adapts to new threat vectors.',
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description:
        'Process datasets of any size in seconds. Our optimized infrastructure ensures rapid analysis without compromising accuracy, giving you actionable insights when you need them most.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AIAssistant />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 text-gradient">About DataGuard</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Protecting networks with cutting-edge AI technology. DataGuard leverages advanced
              machine learning algorithms to detect and prevent DDoS attacks in real-time, ensuring
              your infrastructure stays secure and operational.
            </p>
          </motion.div>

          <div className="space-y-8">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass glow-red p-8 rounded-xl"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-primary/20 p-4 rounded-lg">
                    <card.icon className="w-12 h-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 glass glow-cyan p-8 rounded-xl text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To provide accessible, powerful, and privacy-focused cybersecurity tools that empower
              organizations of all sizes to protect their digital infrastructure from evolving
              threats.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
