// components/Contact/Contact.tsx
"use client";

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import History from '@/components/About/History';
import MissionVision from '@/components/About/MissionVision';
import Leader from '@/components/Leader/Leader';
import { Footer } from '@/components/Footer/Footer';

const AboutPage = () => {
  return (
    <>
        <Navbar />
        <History />
        <MissionVision />
        <Leader />
        <Footer />
    </>
  );
};

export default AboutPage;