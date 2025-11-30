import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Resources.css';

const Resources = () => {
  const resources = [
    {
      id: 1,
      icon: '',
      title: 'Mental Health',
      description: 'Learn about mental health, stress management, and emotional wellbeing from trusted sources.',
      tag: 'Education',
      links: [
        {
          icon: '­ƒÅÑ',
          title: 'Mental Health America',
          description: 'Comprehensive mental health resources',
          url: 'https://www.mhanational.org'
        },
        {
          icon: '',
          title: 'NAMI',
          description: 'Support and education for mental health',
          url: 'https://www.nami.org'
        }
      ]
    },
    {
      id: 2,
      icon: '',
      title: 'Mindfulness',
      description: 'Discover techniques for meditation, breathing exercises, and living in the present moment.',
      tag: 'Practice',
      links: [
        {
          icon: '',
          title: 'Headspace Blog',
          description: 'Meditation and mindfulness tips',
          url: 'https://www.headspace.com/blog'
        },
        {
          icon: '',
          title: 'Calm Resources',
          description: 'Sleep, meditation, and relaxation',
          url: 'https://www.calm.com/blog'
        }
      ]
    },
    {
      id: 3,
      icon: '',
      title: 'Research & Articles',
      description: 'Evidence-based research on breathing techniques and their benefits for stress reduction.',
      tag: 'Science',
      links: [
        {
          icon: '',
          title: 'PubMed Central',
          description: 'Scientific studies on breathing',
          url: 'https://www.ncbi.nlm.nih.gov/pmc'
        },
        {
          icon: '',
          title: 'Psychology Today',
          description: 'Mental health insights',
          url: 'https://www.psychologytoday.com'
        }
      ]
    },
    {
      id: 4,
      icon: '',
      title: 'Crisis Support',
      description: 'Immediate help and support resources available 24/7 for mental health emergencies.',
      tag: 'Emergency',
      links: [
        {
          icon: '',
          title: 'Crisis Text Line',
          description: 'Text HOME to 741741',
          url: 'https://www.crisistextline.org'
        },
        {
          icon: '',
          title: 'National Suicide Prevention',
          description: 'Call 988 anytime',
          url: 'https://988lifeline.org'
        }
      ]
    },
    {
      id: 5,
      icon: '',
      title: 'Self-Care',
      description: 'Practical tips and strategies for daily self-care routines and building healthy habits.',
      tag: 'Wellness',
      links: [
        {
          icon: '',
          title: 'Self-Care Guide',
          description: 'Daily wellness practices',
          url: 'https://www.verywellmind.com/self-care-strategies'
        },
        {
          icon: '',
          title: 'Wellness Toolkit',
          description: 'Build your self-care routine',
          url: 'https://www.samhsa.gov/wellness-initiative'
        }
      ]
    },
    {
      id: 6,
      icon: '',
      title: 'Community',
      description: 'Connect with others, share experiences, and find support groups in your area.',
      tag: 'Support',
      links: [
        {
          icon: '',
          title: 'Support Groups',
          description: 'Find local and online groups',
          url: 'https://www.mhanational.org/find-support-groups'
        },
        {
          icon: '',
          title: 'Mental Health Forums',
          description: 'Join the conversation',
          url: 'https://www.7cups.com'
        }
      ]
    }
  ];

  return (
    <>
      <div className="resources-page">
        <div className="resources-container">
          <div className="resources-hero">
            <h1 className="resources-hero-title">Mental Health Resources</h1>
            <p className="resources-hero-subtitle">
              Curated resources from mental health professionals to support your wellbeing journey
            </p>
          </div>

          <div className="resources-grid">
            {resources.map(resource => (
              <div key={resource.id} className="resource-card">
                <div className="resource-header">
                  <span className="resource-icon">{resource.icon}</span>
                  <h2 className="resource-title">{resource.title}</h2>
                </div>
                <div className="resource-body">
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-links">
                    {resource.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-link-item"
                      >
                        <span className="link-icon">{link.icon}</span>
                        <div className="link-text">
                          <div className="link-title">{link.title}</div>
                          <p className="link-description">{link.description}</p>
                        </div>
                        <span className="link-icon"></span>
                      </a>
                    ))}
                  </div>
                  <span className="resource-tag">{resource.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <div className="cta-content">
              <h2 className="cta-title">Need Help Now?</h2>
              <p className="cta-subtitle">
                If you're experiencing a mental health crisis, reach out for immediate support
              </p>
              <a href="tel:988" className="btn-cta">Call 988 - Free & Confidential</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
