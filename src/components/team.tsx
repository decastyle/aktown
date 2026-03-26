import { Skiper54 } from './ui/skiper54';
import { useLang } from '../i18n';

export default function Team() {
    const { tr } = useLang();
    const T = tr.team;

    return (
        <div className="w-full bg-background">
            <div className="container mx-auto">
                <div className="flex gap-8 py-8 items-center justify-center flex-col">
                    <div className="flex gap-4 flex-col px-4">
                        <div className="flex items-center flex-col">
                            <h1 className="text-3xl md:text-6xl max-w-2xl font-regular font-[Kinetika]">
                                {T.heading}
                            </h1>
                        </div>
                        <p className="text-base md:text-base leading-relaxed tracking-tight text-foreground max-w-2xl leading-7 [&:not(:first-child)]:mt-6">
                            <p className="text-lg font-semibold mb-2">
                                {T.subheading}
                            </p>{' '}
                            {T.body}
                        </p>
                    </div>
                    <Skiper54 />
                </div>
            </div>
        </div>
    );
}
