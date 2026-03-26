'use client';

import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { useMediaQuery } from '../hooks/useMediaQuery';

import BirAuylLogo from '../assets/birauyl-logo.png';
import BirAuylBgVideo from '../assets/birauyl-bg-loop.webm';
import BoxVideo from "../assets/birauyl-box-loop.webm";

import Navbar from './navbar';
import { useLang } from '../i18n';

export default function BirAuyl() {
    const navigate = useNavigate();
    const { tr } = useLang();
    const T = tr.birauyl;
    
    // Check if mobile for alignment logic (e.g., < 1024px)
    const isMobile = useMediaQuery('(max-width: 1024px)');
    // Temporary layout-tuning controls for the left box video.
    const showBoxDebug = false;
    const boxOffsetX = isMobile ? 30 : 30;
    const boxOffsetY = isMobile ? -15 : -15;

    return (
        <>
            <Navbar onLogoClick={() => navigate({ to: '/' })} />
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    // Changed to min-height to prevent content cutoff on small screens
                    minHeight: '100vh', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#07101e',
                    padding: '80px 24px', // Space for navbar and breathing room
                    boxSizing: 'border-box',
                    overflowX: 'hidden',
                }}
            >
                {/* ── Background video ── */}
                <video
                    autoPlay muted loop playsInline
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.92,
                        filter: 'brightness(0.85)',
                        zIndex: 0,
                    }}
                >
                    <source src={BirAuylBgVideo} type="video/webm" />
                </video>

                {/* ── Vignette ── */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        background: 'radial-gradient(ellipse 130% 100% at 50% 50%, transparent 25%, rgba(7,16,30,0.65) 100%)',
                        zIndex: 1,
                    }}
                />

                {/* ── Content Container ── */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '50px' : 'clamp(32px, 6vw, 80px)',
                        width: '100%',
                        maxWidth: 1200,
                    }}
                >
                    {/* LEFT — Box Video */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            flexShrink: 0,
                            width: 'clamp(230px, 34vw, 460px)',
                            position: 'relative',
                            overflow: 'visible',
                            outline: showBoxDebug ? '1px dashed rgba(56,189,248,0.95)' : 'none',
                            background: showBoxDebug ? 'rgba(56,189,248,0.08)' : 'transparent',
                        }}
                    >
                        {showBoxDebug && (
                            <>
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        pointerEvents: 'none',
                                        border: '1px solid rgba(56,189,248,0.55)',
                                        zIndex: 3,
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: 0,
                                        right: 0,
                                        borderTop: '1px dashed rgba(56,189,248,0.7)',
                                        pointerEvents: 'none',
                                        zIndex: 3,
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: 0,
                                        bottom: 0,
                                        borderLeft: '1px dashed rgba(56,189,248,0.7)',
                                        pointerEvents: 'none',
                                        zIndex: 3,
                                    }}
                                />
                            </>
                        )}
                        <video
                            autoPlay muted loop playsInline
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                transform: `translate(${boxOffsetX}px, ${boxOffsetY}px) scale(${isMobile ? 2 : 1.5})`,
                                transformOrigin: 'center center',
                                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))',
                            }}
                        >
                            <source src={BoxVideo} type="video/webm" />
                        </video>
                    </motion.div>

                    {/* RIGHT — Info Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMobile ? 'center' : 'flex-start',
                            textAlign: isMobile ? 'center' : 'left',
                            maxWidth: 520,
                        }}
                    >
                        {/* Logo */}
                        <motion.img
                            src={BirAuylLogo}
                            alt="Bir Auyl"
                            style={{
                                width: 'clamp(180px, 25vw, 320px)',
                                marginBottom: 16,
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                            }}
                        />

                        {/* Badge */}
                        <span style={{
                            fontFamily: 'Kinetika, sans-serif',
                            fontSize: 10,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.5)',
                            marginBottom: 24,
                            padding: '6px 14px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 100,
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                        }}>
                            {T.badge}
                        </span>
                        
                        {/* Description */}
                        <p style={{
                            fontFamily: 'Kinetika, sans-serif',
                            fontSize: 'clamp(15px, 1.2vw, 18px)',
                            lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: 32,
                            maxWidth: isMobile ? '90%' : '100%',
                        }}>
                            {T.description}
                        </p>

                        {/* Stats Table-like Layout */}
                        <div style={{
                            display: 'flex',
                            gap: isMobile ? '30px' : '40px',
                            padding: '20px 0',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            width: '100%',
                            justifyContent: isMobile ? 'center' : 'flex-start'
                        }}>
                            {[
                                { value: '8–12', label: T.statPlayers },
                                { value: '20м', label: T.statTime },
                                { value: '12+', label: T.statAge },
                            ].map((s) => (
                                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <span style={{
                                        fontFamily: 'Kinetika, sans-serif',
                                        fontSize: 'clamp(22px, 2vw, 28px)',
                                        fontWeight: 500,
                                        color: '#fff',
                                    }}>{s.value}</span>
                                    <span style={{
                                        fontSize: 9,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(255,255,255,0.4)',
                                    }}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}