// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-a52ccbacbc0d553d99e20f9a168d288f');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/a52ccbacbc0d553d99e20f9a168d288f/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/b0/46/2c/b0462cdaa101bb3ed80d53504e05a8a8.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="7d20547066bb2b54071cbfebbd691145"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/7d/20/54/7d20547066bb2b54071cbfebbd691145.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}