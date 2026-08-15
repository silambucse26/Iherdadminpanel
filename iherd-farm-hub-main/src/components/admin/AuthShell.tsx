import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import iherdLogo from "@/assets/iherd-logo.png.asset.json";

export const POPPINS = {
  fontFamily: "'Poppins', system-ui, sans-serif",
} as const;

type AuthShellProps = {
  title: string;
  subtitle: string;
  badge: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  badge,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div
      style={POPPINS}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Faded cow background */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/cow-bg.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.80) 50%, rgba(232,245,233,0.82) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#66BB6A]/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-12">
        {/* LEFT — About iHerd */}
        <aside className="flex flex-col justify-center">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://play-lh.googleusercontent.com/cfoVS1sVUQ7GcwUxpvEhDNghb5ax2l0_Z7TwA4ktRmMj2KytuT8Cd50ELbIwjl4UO5P9hAjmKHu535SOF-4Pufw=w480-h960-rw"
              alt="iHerd logo"
              width={160}
              height={160}
              className="h-32 w-32 object-contain sm:h-40 sm:w-40"
            />

            <h2 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[42px]">
              Manage your herd, sellers &amp; marketplace —{" "}
              <span className="text-[#2E7D32]">all in one console.</span>
            </h2>

            <div className="mt-8 hidden items-center justify-center gap-4 text-xs text-gray-600 lg:flex">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2E7D32]" />
                ISO-grade security
              </div>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <div>Trusted by 12,000+ farmers</div>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <div>598 verified sellers</div>
            </div>
          </div>
        </aside>

        {/* RIGHT — Auth card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/60 bg-white/80 p-7 shadow-[0_20px_60px_-20px_rgba(27,94,32,0.35)] backdrop-blur-xl sm:p-9">
              <div className="space-y-1.5 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5E9] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2E7D32]">
                  <ShieldCheck className="h-3 w-3" />
                  {badge}
                </div>
                <h1 className="pt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-[28px]">
                  {title}
                </h1>
                <p className="text-sm text-gray-600">{subtitle}</p>
              </div>

              {children}
            </div>

            <div className="mt-6 text-center text-sm text-gray-700">
              {footer}
            </div>
            <p className="mt-3 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} iHerd · Smart Cattle Care Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
