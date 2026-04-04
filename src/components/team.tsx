import { motion } from 'framer-motion';

import { Skiper54 } from './ui/skiper54';
import { useLang } from '../i18n';

export default function Team() {
    const { tr } = useLang();
    const T = tr.team;

    return (
        <section
            className="w-full border-t border-border/40 bg-gradient-to-b from-muted/15 via-background to-background"
            aria-labelledby="team-heading"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.header
                    className="mx-auto flex max-w-3xl flex-col items-center gap-4 py-10 text-center md:gap-6 md:pb-14 md:pt-16 lg:pb-16 lg:pt-20"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1
                        id="team-heading"
                        className="text-3xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl   "
                    >
                        {T.heading}
                    </h1>
                    <p className="aktown-section-lead text-left">
                        {T.subheading}
                    </p>
                    <p className="aktown-readable aktown-section-body mx-auto text-left text-pretty">
                        {T.body}
                    </p>
                </motion.header>
            </div>

            <div className="w-full pb-8 md:pb-12">
                <Skiper54 />
            </div>
        </section>
    );
}
