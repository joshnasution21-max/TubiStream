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

        const nativeContainer = document.getElementById('container-0c3936a0836360294dfab67f66d3191a');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/0c3936a0836360294dfab67f66d3191a/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/e5/4d/0e/e54d0e712f968d5cd1a7173a078bc2bb.js' }
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
            if(document.querySelector(`script[src*="a10e6f6e45c3799e9a045721ba340620"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/a1/0e/6f/a10e6f6e45c3799e9a045721ba340620.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}