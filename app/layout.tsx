import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agnieszka | Salon fryzjerski w Gnieźnie",
  description: "Chwila dla Ciebie. Poznaj salon fryzjerski Agnieszka przy ul. Świętego Michała 12 w Gnieźnie. Umów wizytę i zadbaj o swoje włosy.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://agnieszka-salon.vercel.app"),
  openGraph: {
    title: "Agnieszka — piękno zaczyna się od Ciebie",
    description: "Salon fryzjerski w Gnieźnie. Koloryzacja, strzyżenie i pielęgnacja.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}
